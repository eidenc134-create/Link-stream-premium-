'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 80 },
  { name: 'Mar', value: 65 },
  { name: 'Apr', value: 120 }
]

export default function Chart() {
  return (
    <LineChart width={500} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  )
}
