import { Send as SendIcon } from '@mui/icons-material'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

type PersonalStatsResponse = {
  personalstats: {
    [key: string]: number
  }
}

type PersonalStatsData = {
  oldData?: PersonalStatsResponse
  newData?: PersonalStatsResponse
}

export async function getStaticProps() {
  return {}
}

export default function PersonalStats() {
  const [userId, setUserId] = useState<string>('')
  const [day, setDay] = useState<number>(30)
  const [apiKey, setApiKey] = useState<string>('')
  const [data, setData] = useState<PersonalStatsData>({})

  const fetchUserPersonalStats = async () => {
    const snapshotTimestamp = new Date().getTime() / 1000 - day * 24 * 60 * 60
    const oldData = await fetch(
      `https://api.torn.com/user/${userId}?selections=personalstats&stat=xantaken,refills,boostersused,cantaken,statenhancersused,useractivity&key=${apiKey}&timestamp=${snapshotTimestamp}`,
    ).then((resp) => resp.json())
    const newData = await fetch(
      `https://api.torn.com/user/${userId}?selections=personalstats&key=${apiKey}`,
    ).then((resp) => resp.json())
    setData({ oldData, newData })
    return { oldData, newData }
  }

  useEffect(() => {
    setApiKey(window.localStorage.getItem('apiKey') || '')
  }, [])

  return (
    <div>
      <h1>Personal Stats</h1>
      <p>
        <TextField
          id="userId"
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.currentTarget.value)}
          sx={{
            verticalAlign: 'middle',
            mr: 2,
          }}
        />
        <TextField
          id="day"
          label="Day"
          type="number"
          value={day}
          onChange={(e) => setDay(parseInt(e.currentTarget.value) || 30)}
          sx={{
            verticalAlign: 'middle',
            mr: 2,
          }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={fetchUserPersonalStats}
        >
          <SendIcon />
        </Button>
      </p>
      <div>
        {data.oldData && data.newData && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Stat</TableCell>
                  <TableCell>{day} Days Before</TableCell>
                  <TableCell>Current</TableCell>
                  <TableCell>Gained</TableCell>
                  <TableCell>Gained / Day</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { label: 'Xanax Taken', key: 'xantaken' },
                  { label: 'Energy Refills', key: 'refills' },
                  { label: 'Boosters Used', key: 'boostersused' },
                  { label: 'Energy Drinks Used', key: 'cantaken' },
                  { label: 'Stat Enhancers Used', key: 'statenhancersused' },
                  { label: 'User Activity', key: 'useractivity' },
                ].map(
                  (v, i) =>
                    data &&
                    data.oldData &&
                    data.newData &&
                    data.oldData.personalstats &&
                    data.newData.personalstats && (
                      <TableRow key={i}>
                        <TableCell>{v.label}</TableCell>
                        <TableCell>
                          {data.oldData.personalstats[v.key]}
                        </TableCell>
                        <TableCell>
                          {data.newData.personalstats[v.key]}
                        </TableCell>
                        <TableCell>
                          {data.newData.personalstats[v.key] -
                            data.oldData.personalstats[v.key]}
                        </TableCell>
                        <TableCell>
                          {(data.newData.personalstats[v.key] -
                            data.oldData.personalstats[v.key]) /
                            day}
                        </TableCell>
                      </TableRow>
                    ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  )
}
