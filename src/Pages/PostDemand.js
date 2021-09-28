import { useState, useEffect } from "react";
import axios from "../api/axios";
import { getCategory } from "../api/api";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export default function PostDemand() {
    const [form, setForm] = useState({
        title: '',
        budget_type: true,
        quantity: '',
        quantity_unit: '',
        category: '',
        description: '',
        expire_date: '',
        minimum_budget: 0,
        maximum_budget: 0,
        image_one: '',
        image_two: '',
        image_three: '',
        image_one_name: '',
        image_two_name: '',
        image_three_name: '',
    });
    const [categories, setCategories] = useState([]);
    const [quantity_unit, setUnit] = useState([]);

    async function getCat() {
        let data = await getCategory();
        setCategories(data);
    }

    useEffect(() => {
        document.title = 'Post a Demand';
        getCat();
        return () => {
        }
    }, [])

    function upLoadImageOneServer() {
        const imageForm = { image_type: "one", image: form.image_one };
        console.log(imageForm);
        axios.post("/image-upload", imageForm)
            .then((response) => {
                if (response.status === "success") {
                    setForm({
                        image_one: response.image_url,
                        image_one_name: response.image,
                    });
                }
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    console.log(error.response.data);
                } else {
                    console.log(error);
                }
            });

    }

    function onImageUpload(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        let file = files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            // form.image_one = e.target.result;
            setForm({ ...form, image_one: e.target.result })
            upLoadImageOneServer();
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();

    }

    function onCategoryChange(e) {
        let category_id = e.target.value;

        axios.get(`category-unit/${category_id}`)
            .then(response => {
                setUnit(response.data);
            });
        let currentCategory = categories.find(cat => cat.id === category_id);
        setForm({ ...form, category: currentCategory });
        setForm({ ...form, quantity_unit: '' })

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h3>Post a New Demand</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p>Upload Image</p>
                            {form.image_one && <img src={form.image_one} alt="demandImage" />}
                            <input type="file" className="form-control" onChange={onImageUpload} />
                        </div>
                        <div className="form-group mt-2">
                            <p>Post Title</p>
                            <input type="text" value={form.title} className="form-control"
                                onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        </div>
                        <div className="form-group mt-2">
                            <p>Select Category</p>
                            <select className="form-control" onChange={onCategoryChange}>
                                <option value="">Select A Category</option>

                                {categories.map((category) => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })}
                            </select>

                        </div>
                        <div className="form-group mt-2">
                            <p>Quantity</p>
                            <input type="number" value={form.quantity} className="form-control"
                                onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                        </div>
                        <div className="form-group mt-2">
                            <p>Select Unit</p>
                            <select className="form-control" onChange={(e) => setForm({ ...form, quantity_unit: e.target.value })}>
                                <option value="">Select A Unit</option>

                                {quantity_unit.map((value) => {
                                    return <option key={value.id} value={value.id}>{form.quantity} {value.name}</option>
                                })}
                            </select>

                        </div>

                        <div className="form-group">
                            <p>Budget</p>
                            <button onClick={() => setForm({ ...form, budget_type: !form.budget_type })} className={`btn ${form.budget_type ? "btn-success" : "btn-danger"}`}>
                                {form.budget_type ? "Yes" : "No"}
                            </button>
                        </div>

                        {form.budget_type && <div className="form-group mt-2">
                            <p>Minimum Budget</p>
                            <input type="number" value={form.minimum_budget} className="form-control"
                                onChange={(e) => setForm({ ...form, minimum_budget: e.target.value })} />
                        </div>}
                        {form.budget_type && <div className="form-group mt-2">
                            <p>Maximum Budget</p>
                            <input type="number" value={form.maximum_budget} className="form-control"
                                onChange={(e) => setForm({ ...form, maximum_budget: e.target.value })} />
                        </div>}

                        <div className="form-group">
                            <p>Description</p>
                            <textarea className="form-control" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
                        </div>

                        <div className="form-group">
                            <p>Epire Date</p>
                            <DatePicker locale="bn" dateFormat="yyyy-mm-dd" className="form-control" selected={form.expire_date} onChange={(date) => setForm({ ...form, expire_date: date })} />
                        </div>
                        <div className="form-group">

                            <button type="submit" className="btn btn-primary mt-2">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

