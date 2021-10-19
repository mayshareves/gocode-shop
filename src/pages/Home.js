import { useParams } from "react-router"
function Home(){
    const { id }= useParams()
    return  (
        <div>Home</div>
    )
}

export default Home;