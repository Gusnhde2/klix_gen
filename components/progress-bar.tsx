"use client";

export default function ProgressBar({
  generationsCount,
  availableCount,
}: {
  generationsCount: number;
  availableCount: number;
}) {
  return (
    <div className="flex flex-col w-full items-center mb-10">
      <div className="flex flex-col w-11/12 items-center justify-center ">
        <div className="md:flex flex-col md:flex-row justify-between w-full hidden  items-center justify-center gap-1 p-1 md:px-10 md:py-2 dark:text-white dark:bg-gray-800 w-10/12 rounded-lg">
          <p>Generisano komentara: {generationsCount}</p>
          <p>Preostalo: {availableCount}</p>
        </div>
        <div className=" w-full h-5 bg-gray-200 rounded-lg">
          <div
            className="h-full bg-green-500 rounded-lg"
            style={{ width: `${(generationsCount / availableCount) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
