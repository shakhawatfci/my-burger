import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function Demand() {

    const [demands, setDemands] = useState('');

    const [state, setState] = useState({
        demands: [],

    })

    const fetchData = async (pageNumber = 1) => {
        const api = await fetch(`https://api.bido.live/api/v1/demand-list?page=${pageNumber}`);
        setDemands({
            demands: await api.json()
        });
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="container">
            <div className="row">
                {

                    demands?.demands?.data ?
                        demands?.demands?.data?.map((demand) => (
                            <div className="col-md-3" key={demand.id} >

                                <div className="demandPost">
                                    <div className="userNmae">
                                        <p><small>{demand.user.name} </small></p>

                                    </div>
                                    <div className="postDetails">
                                        <Link to={`demand/${demand.id}/${demand.slug}`} params={{ id: demand.id, title: demand.slug }} style={{ textDecoration: 'none' }}>
                                            <img className="img-responsive img-fluid img-thumbnail"
                                                src={demand.image_one_big}

                                                alt="cherry" />
                                            <h3 style={{ color: 'green' }}>{demand.title}</h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'pink' }}>{demand.minimum_budget} - {demand.maximum_budget} BDT</span>
                                                <span>{demand.quantity} {demand.quantity_unit.name}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        )) : 'Loading..'

                }
            </div>
        </div >
    );
}