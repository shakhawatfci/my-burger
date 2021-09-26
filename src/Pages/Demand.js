import { useState, useEffect } from 'react';
import { getDemands } from '../api/api';

import SingleDemand from './components/SingleDemand';

export default function Demand() {
    const [state, setState] = useState({
        demands: [],
        demandLinks: null,
        demandMeta: null
    })

    const fetchData = async (pageNumber = 1) => {
        let api = await getDemands(pageNumber = 1);
        const { data, links, meta } = await api;
        setState({
            demands: data,
            demandLinks: links,
            demandMeta: meta,
        });
    };

    useEffect(() => {
        fetchData();
        return () => {
            setState({});
        };
    }, [])
    return (
        <div className="container">
            <div className="row">
                {
                    state?.demands ?
                        state?.demands?.map((demand) => (
                            <div className="col-md-3" key={demand.id}  >
                                <SingleDemand demand={demand} />
                            </div>
                        )) : 'Loading..'
                }
            </div>
        </div>
    );
}