import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  EGE_SPECIFICATION,
  OGE_SPECIFICATION,
  generateCustomVariant,
} from '../../data/examVariantsData';
import { ExamSpecificationItem, ExamTaskInstance } from '../../types';

interface VariantBuilderProps {
  initialExamType?: 'EGE' | 'OGE';
  onStartExam: (examType: 'EGE' | 'OGE', tasks: ExamTaskInstance[]) => void;
}

type DifficultyLevel = 'Легко' | 'Нормально' | 'Сложно';

export const VariantBuilder: React.FC<VariantBuilderProps> = ({
  initialExamType = 'EGE',
  onStartExam,
}) => {
  const [examType, setExamType] = useState<'EGE' | 'OGE'>(initialExamType);
  const [taskCounts, setTaskCounts] = useState<Record<number, number>>({});
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Нормально');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExamType(initialExamType);
  }, [initialExamType]);

  useEffect(() => {
    if (activeTask === null) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) {
        setActiveTask(null);
      }
    };
    const closeOnScroll = () => setActiveTask(null);

    document.addEventListener('pointerdown', closeOnOutsideClick);
    window.addEventListener('scroll', closeOnScroll, true);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      window.removeEventListener('scroll', closeOnScroll, true);
    };
  }, [activeTask]);

  const specificationList: ExamSpecificationItem[] = useMemo(
    () => (examType === 'EGE' ? EGE_SPECIFICATION : OGE_SPECIFICATION),
    [examType],
  );
  const firstPart = specificationList.filter((task) => task.part === 1);
  const secondPart = specificationList.filter((task) => task.part === 2);

  const { totalSelectedTasks, totalMaxScore, estimatedTimeMinutes } = useMemo(() => {
    return specificationList.reduce(
      (totals, task) => {
        const count = taskCounts[task.number] || 0;
        totals.totalSelectedTasks += count;
        totals.totalMaxScore += count * task.maxPoints;
        totals.estimatedTimeMinutes += count * task.timeMinutes;
        return totals;
      },
      { totalSelectedTasks: 0, totalMaxScore: 0, estimatedTimeMinutes: 0 },
    );
  }, [specificationList, taskCounts]);

  const updateCount = (taskNumber: number, nextCount: number) => {
    if (nextCount <= 0) {
      setTaskCounts((previous) => {
        const updated = { ...previous };
        delete updated[taskNumber];
        return updated;
      });
      setActiveTask(null);
      return;
    }

    setTaskCounts((previous) => ({
      ...previous,
      [taskNumber]: Math.min(20, nextCount),
    }));
  };

  const openTaskDialog = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskNumber: number,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const dialogWidth = Math.min(220, window.innerWidth - 32);
    const left = Math.max(16, Math.min(bounds.left, window.innerWidth - dialogWidth - 16));
    const top =
      bounds.bottom + 8 + 104 > window.innerHeight
        ? Math.max(16, bounds.top - 112)
        : bounds.bottom + 8;

    if (!taskCounts[taskNumber]) {
      setTaskCounts((previous) => ({ ...previous, [taskNumber]: 1 }));
    }
    setActiveTask(taskNumber);
    setDialogPosition({ top, left, width: dialogWidth });
  };

  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0, width: 220 });

  const renderTaskGrid = (tasks: ExamSpecificationItem[]) => (
    <div className="grid grid-cols-7 gap-1.5">
      {tasks.map((task) => {
        const count = taskCounts[task.number] || 0;
        const isSelected = count > 0;

        return (
          <button
            key={task.number}
            type="button"
            aria-label={`Задание ${task.number}${isSelected ? `, выбрано ${count}` : ''}`}
            aria-pressed={isSelected}
            onClick={(event) => openTaskDialog(event, task.number)}
            className={`aspect-square rounded-md border text-lg font-medium leading-none transition ${
              isSelected
                ? 'border-transparent bg-[#DCE4FC] text-[#0F3EB0]'
                : 'border-[#3155D5] bg-white text-[#0F3EB0] hover:bg-blue-50'
            }`}
          >
            {task.number}
          </button>
        );
      })}
    </div>
  );

  const selectedTasksForPart = (part: 1 | 2) =>
    specificationList.filter(
      (task) => task.part === part && (taskCounts[task.number] || 0) > 0,
    );

  const startExam = () => {
    if (totalSelectedTasks === 0) return;
    onStartExam(
      examType,
      generateCustomVariant({
        examType,
        taskCounts,
      }),
    );
  };

  return (
    <div className="space-y-4 pb-2">
      <h2 className="pt-1 text-center text-xl font-extrabold">Собрать свой вариант</h2>

      <section className="space-y-4 rounded-2xl bg-white px-4 py-5 shadow-sm">
        <div>
          <h3 className="mb-2 text-xs font-medium text-slate-500">I часть</h3>
          {renderTaskGrid(firstPart)}
        </div>
        {secondPart.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-medium text-slate-500">II часть</h3>
            {renderTaskGrid(secondPart)}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h3 className="px-3 text-sm font-bold">Уровень сложности</h3>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-2">
          {(['Легко', 'Нормально', 'Сложно'] as DifficultyLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              aria-pressed={difficulty === level}
              onClick={() => setDifficulty(level)}
              className={`rounded-xl py-3 text-sm font-semibold ${
                difficulty === level
                  ? 'bg-[#DCE4FC] text-[#0F3EB0]'
                  : 'bg-[#EEF1F9] text-[#0F3EB0]'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      <section className="px-3">
        <p className="text-sm font-bold">
          Выбрано: <span className="text-[#0F3EB0]">{totalSelectedTasks} заданий</span>
        </p>
        {totalSelectedTasks > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-3">
            {([1, 2] as const).map((part) => {
              const selectedTasks = selectedTasksForPart(part);
              if (selectedTasks.length === 0) return null;

              return (
                <div key={part}>
                  <p className="mb-1 text-xs font-bold text-slate-400">{part === 1 ? 'I часть:' : 'II часть:'}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTasks.map((task) => {
                      const count = taskCounts[task.number];
                      return (
                        <span
                          key={task.number}
                          className="flex h-7 min-w-8 items-center justify-center rounded bg-[#DCE4FC] px-2 text-sm font-semibold text-[#0F3EB0]"
                          title={task.title}
                        >
                          {task.number}
                          {count > 1 && <span className="ml-1 font-extrabold">×{count}</span>}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <button
        type="button"
        id="btn-start-custom-variant"
        onClick={startExam}
        disabled={totalSelectedTasks === 0}
        className="w-full rounded-xl bg-[#22242A] py-4 text-base font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Начать
      </button>

      {activeTask !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label={`Количество заданий «${specificationList.find((task) => task.number === activeTask)?.title}»`}
          className="fixed z-50 rounded-xl bg-[#1D2023] p-3 text-white shadow-xl"
          style={{
            top: dialogPosition.top,
            left: dialogPosition.left,
            width: dialogPosition.width,
          }}
        >
          <p className="mb-2 truncate text-sm font-bold">
            {specificationList.find((task) => task.number === activeTask)?.title}
          </p>
          <div className="flex h-11 w-fit items-center gap-2 rounded-lg bg-white px-1.5 text-neutral-900">
            <button
              type="button"
              aria-label="Уменьшить количество"
              onClick={() => updateCount(activeTask, (taskCounts[activeTask] || 0) - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-200"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-bold">{taskCounts[activeTask] || 0}</span>
            <button
              type="button"
              aria-label="Увеличить количество"
              onClick={() => updateCount(activeTask, (taskCounts[activeTask] || 0) + 1)}
              disabled={(taskCounts[activeTask] || 0) >= 20}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-200 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <span className="sr-only">
        Максимальный балл: {totalMaxScore}. Примерное время: {estimatedTimeMinutes} минут.
      </span>
    </div>
  );
};
