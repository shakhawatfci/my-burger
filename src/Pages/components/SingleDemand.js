import { Link } from "react-router-dom"

export default function SingleDemand({ demand }) {
    return (
        <div className="demandPost">
            <div className="userNmae">
                <p><small>{demand.user.name} </small></p>

            </div>
            <div className="postDetails">
                <Link to={`demand/${demand.id}/${demand.slug}`} params={{ id: demand.id, title: demand.slug }} style={{ textDecoration: 'none' }}>
                    <img className="img-responsive img-fluid img-thumbnail"
                        src={demand.image_one_big ? demand.image_one_big : demand.default_big_image}

                        alt="cherry" />
                    <h3 style={{ color: 'green' }}>{demand.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'pink' }}>{demand.minimum_budget} - {demand.maximum_budget} BDT</span>
                        <span>{demand.quantity} {demand.quantity_unit.name}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}