import React from 'react';

import {STAT_MAP} from '../../constants/statMap';
import Progress from '../Progress/View';

import type {StatsProps} from './View.types';

const Stats = (props: StatsProps) => {
  const {stats, className} = props;
  return (
    <div className={'bg-white rounded-xl shadow p-4 mb-4 ' + className}>
      <h3 className="font-bold">Base Stats</h3>
      <div className="text-sm mt-4">
        {stats.map((stat, i) => (
          <div className="flex items-center" key={`stats-${i}`}>
            <span className="w-40 text-left mr-2">{STAT_MAP[stat.stat.name]}</span>
            <span className="w-10 text-left font-bold">{stat.base_stat}</span>
            <Progress progress={(stat.base_stat/255) * 100}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;