import { useRouter } from 'next/router'

type Props = {};
export default function CreateTournament(props: Props) {
  const router = useRouter()
  const { id } = router.query

  return (
    <h1>Edit tour id: {id}</h1>
  )
}