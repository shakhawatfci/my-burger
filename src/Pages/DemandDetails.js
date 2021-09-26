import { useParams } from 'react-router-dom';

function DemandDetails() {
    const { id, title } = useParams();

    return (
        <div className="container">
            <div className="row">
                <h3>Hello Demand {title}</h3>
            </div>
        </div>
    )
};

export default DemandDetails;