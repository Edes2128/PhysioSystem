import React, { useState } from 'react'


export default function ShtoOfert() {

    const [list,setList] = useState([])
    const [listDrejtuar,setListDretuar] = useState([])

    
    const addOffer = (e) => {
        e.preventDefault();
    }
    


    return (
        <div className="add-offer" >
            <p className="add-offer-title fs-30 fw-semib ">Add Offer</p>
            <form className="add-offer-form flex fd-column ai-start" onSubmit={addOffer}>

                <div className="add-offer-form-inputs flex jc-spaceb ai-center">
                    <div className="add-offer-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Titulli</label>
                        <input className="fs-18 fw-regular" type="text" />
                    </div>
                    <div className="add-offer-form-inputs-item-select flex ai-center">
                        <div className="add-offer-form-inputs-item-select-input flex fd-column ai-start">
                            <label className="fs-18 fw-regular" htmlFor="#">Ulja</label>
                            <input className='fs-18 fw-regular' type="number" />
                        </div>
                        <div className="add-offer-form-inputs-item-select-input flex fd-column ai-start">
                            <label className="fs-18 fw-regular" htmlFor="#">Tipi Uljes</label>
                            <select className="fs-18 fw-regular" name="#" id="#">
                                <option value="1">%</option>
                                <option value="1">Money</option>
                            </select>
                        </div>
                    </div>
                    <div className="add-offer-form-inputs-item flex fd-column ai-start">
                        <label className="fs-18 fw-regular" htmlFor="#">Data Mbarimit</label>
                        <input className="fs-18 fw-regular" type="date" />
                    </div>
                </div>

                <div className="add-offer-form-inputs flex jc-spaceb ai-center">
                            <div className="add-offer-form-inputs-multi">
                                <label className="fs-18 fw-regular" htmlFor="#">Drejtuar</label>
                                    <div className="add-offer-form-inputs-multi-input" >
                                        <div className="add-offer-form-inputs-multi-input-list">

                                        </div>
                                    </div>
                            </div>
                </div>

            </form>

        </div>
    )
}
