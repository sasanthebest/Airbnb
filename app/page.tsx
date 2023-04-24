import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from './components/EmptyState'
export default function Home() {
  const isEmpty=true

  if (isEmpty){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="
        pt-3
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-5
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        
        ">
          <div>homes</div>
        </div>
      </Container>
    </ClientOnly>
  )
}
