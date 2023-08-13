import { NavLink } from "react-router-dom";
import { inventoryData } from "../../db/inventoryData";

export function Home() {
    return (
        <div>
            <nav>
                <NavLink to="/">Home</NavLink>
            </nav>
        </div>
    );
}
