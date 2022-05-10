import { useRouter } from 'next/router'

type Props = {};
export default function CreateTournament(props: Props) {
  const router = useRouter()
  const { id, slug } = router.query

  return (
    <div>
      <h1>View detail tour: {id}</h1>
      <p>Slug: {slug}</p>
    </div>
  )
}