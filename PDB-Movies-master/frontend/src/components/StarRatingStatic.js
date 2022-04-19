import { FaStar } from "react-icons/fa";
import "../css/starrating.css"

const StarRating = (userRate) => {

    const rating = userRate;
    
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <FaStar  
                            className="star" 
                            color={ratingValue <= (rating) ? "#ffc107" : "#e4e5e9" } 
                            size={25}
                            />
                    </label>
                );
            })}
        </div>
    )
}

export default StarRating
