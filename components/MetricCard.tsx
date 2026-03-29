type MetricCardProps = {
      label: string
        value: string
        }

        export default function MetricCard({ label, value }: MetricCardProps) {
          return (
              <div className="p-4 bg-white rounded-xl shadow">
                    <h3 className="text-sm text-gray-500">{label}</h3>
                          <p className="text-xl font-bold">{value}</p>
                              </div>
                                )
                                }
