import "./home.css";
import Dogs from '../Dogs/dogs.js';
import Header from '../Header/header.js';


export default function Home() {

    return (
        <div >
            <div>
                <Header />
            </div>                
            <div className="list_dogs">
                <Dogs />
            </div>
        </div>
    );
}