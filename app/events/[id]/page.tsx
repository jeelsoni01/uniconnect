import { EventDetailPage } from "@/components/event-detail-page"

export default function EventDetail({ params }: { params: { id: string } }) {
  return <EventDetailPage id={params.id} />
}

