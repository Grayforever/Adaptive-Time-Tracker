import { ClockedHours, columns } from "./column"
import DataTable from "./data-table"

async function getClockedHours(): Promise<ClockedHours[]> {
    const res = await fetch(
      'https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users'
    )
    const data = await res.json()
    return data
  }

const TimeSheet = async () => {
  const data = await getClockedHours()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default TimeSheet
