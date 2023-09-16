import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  from } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import CustomChart from './CustomChart';
import { Link } from 'react-router-dom';

const PerformanceGraph = () => {
  const todos = useSelector((state) => state.todos.todos);
  const [chartData, setChartData] = useState(null);
  const [performanceData, setPerformanceData] = useState({ completed: 0, incomplete: 0 });

  useEffect(() => {
    const todosStream = from(todos);
    const subscription = todosStream
      .pipe(
        map((todo) => ({
          completed: todo.status === 'Done' ? 1 : 0,
          incomplete: todo.status !== 'Done' ? 1 : 0,
        })),
        scan((acc, curr) => ({
          completed: acc.completed + curr.completed,
          incomplete: acc.incomplete + curr.incomplete,
        })),
      )
      .subscribe((data) => {
        setChartData({
          labels: [...Array(todos.length).keys()],
          datasets: [
            {
              label: 'Completed',
              data: Array(todos.length).fill(data.completed),
              borderColor: 'green',
              fill: false,
            },
            {
              label: 'Incomplete',
              data: Array(todos.length).fill(data.incomplete),
              borderColor: 'red',
              fill: false,
            },
          ],
        });

        // Update performanceData
        setPerformanceData(data);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [todos]);

  return (
    <div className='px-[14rem]'>
      <div className='py-6 px-[2rem] bg-white rounded-md'>
        {/* Heading and Back-Home  */}
        <h1 className='text-4xl pl-4  tracking-widest'>PERFORMANCE <Link className='text-base tracking-normal float-right font-normal  focus:border-b focus:border-black hover:transiton focus:duration-150 hover:border-b hover:border-black hover:transiton hover:duration-150' to="/"><i class="fa-solid fa-arrow-left mr-1 text-sm"></i> Back home </Link> </h1>
        {/* Complete / Incomplete    */}
      <div className='float-right flex space-x-3'>
         <p className='text-green-600'>Completed: {performanceData.completed}</p>
         <p className='text-red-600'>Incomplete: {performanceData.incomplete}</p>
      </div>
      {/* Chart  */}
      {todos.length > 0 ? (
        <div>
          <CustomChart data={chartData} />
          <div className="mt-4">
           
          </div>
        </div>
      ) : (
        <div className='my-20 text-2xl'>No To-Dos available to display.</div>
      )}
    </div>
    </div>
  );
};

export default PerformanceGraph;
