import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from './components/EmptyState'
import { getListings } from "./actions/getListings";
import ListingsCard from "./components/listings/ListingsCard";
export default async function Home() {


  const allListings=await getListings()

  if (allListings?.length===0){
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
              {allListings?.map((listing)=>{
                return(
                  <ListingsCard data={listing}/>
                )
              })}
            </div>
      
        
      </Container>
    </ClientOnly>
  )
}
