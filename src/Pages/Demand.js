import { useState, useEffect } from 'react';

export default function Demand() {

    const [demands, setDemands] = useState('');

    const fetchData = async (pageNumber = 1) => {
        const api = await fetch(`https://api.bido.live/api/v1/demand-list?page=${pageNumber}`);
        // let data = await api.json();
        // console.log(data);
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
                {/* <p>{JSON.stringify(demands)}</p> */}

                {
                    demands?.data ?
                        demands?.data?.map((demand) => (
                            <div className="col-md-3" >

                                <div className="demandPost">
                                    <div className="userNmae">
                                        <p><small>{demand.user.name} </small></p>

                                    </div>
                                    <div className="postDetails">
                                        <img className="img-responsive img-fluid img-thumbnail"
                                            src={demand.image_one_medium}
                                            alt="cherry" />
                                        <h4 style={{ color: 'green' }}>{demand.title}</h4>
                                    </div>
                                </div>

                            </div>
                        )) : 'Loading..'

                }
            </div>
        </div >
    );
}