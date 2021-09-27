import { useState, useEffect } from "react";
import axios from "../api/axios";
import { getCategory } from "../api/api";


export default function PostDemand() {
    const [form, setForm] = useState({
        title: '',
        budget_type: false,
        quantity: '',
        quantity_unit: '',
        category: '',
        description: '',
        expire_dte: '',
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

    async function getCat() {
        let data = await getCategory();
        setCategories(data);
    }

    useEffect(() => {
        getCat();
        return () => {
            // cleanup
        }
    }, [])

    function upLoadImageOneServer() {
        let imageForm = { image_type: "one", image: form.image_one };
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
            setForm({ image_one: e.target.result })
            upLoadImageOneServer();
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();

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
                                onChange={(e) => setForm({ title: e.target.value })} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}