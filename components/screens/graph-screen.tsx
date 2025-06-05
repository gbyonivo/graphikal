import { MarketData } from '@/types/market-data'
import { checkMarketData } from '@/utils/market-data-helper'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native'
import { Header } from '../common/header'
import { Graph } from '../ui/graph'

const URL =
  'https://mock.apidog.com/m1/892843-874692-default/marketdata/history/AAPL'

export const GraphScreen = () => {
  const [data, setData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(URL)
        setData(checkMarketData(response.data))
      } catch (error) {
        // TODO: handle error better
        setError(error as AxiosError)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header title="AAPL Market Data" containerStyle={styles.header} />
      {loading && <Text>Loading...</Text>}
      {!!error && <Text>Error coccured</Text>}
      {!!data && <Graph dataPoints={data.data} containerStyle={styles.graph} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  graph: {
    height: 380,
    width: Dimensions.get('window').width - 32,
    borderRadius: 16,
  },
})
