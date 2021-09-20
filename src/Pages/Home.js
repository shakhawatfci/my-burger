import './Home.css';
import { useState } from 'react';

function Home() {
    const [meat, addMeat] = useState(0);
    const [salad, setSalad] = useState(0);
    const handleAddMeat = () => {
        addMeat(meat + 1);
    }
    const handleRemoveMeat = () => {
        addMeat(meat > 0 ? meat - 1 : 0);
    }
    const handleAddSalad = () => {
        setSalad(salad + 1);
    }
    const handleRemoveSalad = () => {
        setSalad(salad > 0 ? salad - 1 : 0);
    }

    function burgerMeat() {
        var elements = [];
        for (var i = 0; i < meat; i++) {
            elements.push(<div className="burger-meat" key={i + 'meat'}></div>);
        }
        return elements;
    }
    function burgerSalad() {
        var elements = [];
        for (var i = 0; i < salad; i++) {
            elements.push(<div className="burger-salad" key={i + 'meat'}></div>);
        }
        return elements;
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-3 mx-auto text-center">
                    <h2>Make My Burger</h2>
                    <div className="mt-2">
                        <div className="burger-top">

                        </div>
                        {/* meat  */}
                        {burgerMeat()}

                        {/* meat  */}

                        {/* salad  */}
                        {burgerSalad()}
                        {/* salad  */}

                        <div className="burger-bottom">

                        </div>
                    </div>
                </div>
                <div className="col-md-5 mx-auto">
                    <h4>Burger Maker</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={handleAddMeat}>Add Meat + </button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-danger" onClick={handleRemoveMeat}>Remove Meat - </button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={handleAddSalad} >Add Salad + </button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-danger" onClick={handleRemoveSalad}>Remove Salad - </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
