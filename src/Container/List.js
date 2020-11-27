import Axios from '../Axios'
import React, { Component } from 'react'

export class List extends Component {

    state = {
        services: [],
        show: false,
        mainServices: [],
        additionalServices: [],
        total: 0
    }

    componentDidMount() {
        Axios.get('https://jsonkeeper.com/b/356L')
            .then(res => {
                this.setState({
                    services: res.data.data.purchased_services,
                }, () => {
                    this.servicesSplit()
                })

            })
            .catch(err => {
                console.log(err)
            })
    }

    servicesSplit = () => {
        const allServices = this.state.services

        const mainServices = []
        const additionalServices = []
        let total = 0

        allServices.map(mainService => {
            mainService.purchased_office_template.purchased_office_services.map(subService => {
                if (subService.service_selected === null) {
                    subService["Main"] = mainService.name
                    additionalServices.push(subService)
                } else {
                    subService["Main"] = mainService.name
                    mainServices.push(subService)
                    total += parseInt(subService.price)
                }
            })
        })

        this.setState({
            mainServices: mainServices,
            additionalServices: additionalServices,
            show: true,
            total: total
        })
    }

    render() {
        return (
            <div>
                {this.state.show
                    ?
                    <div>
                        <h2 style={{ margin: 20 }} className="text-success">Purchased Services</h2>
                        {this.state.mainServices.map(service => {
                            return (
                                <div style={{margin:20}}>
                                    <h4 className="text-left">{service.Main}</h4>
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={service.image} style={{height:100,width:100}} />
                                            <p className="text-center">{service.name}</p>
                                            <strong className="text-right">{service.price} ₹</strong>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}


                        <h2 style={{ color: 'rebeccapurple', marginBottom: 20 }}>Total</h2>
                        <div className="card bg-dark">
                            {this.state.mainServices.map(service => {
                                return (
                                    <div className="row">
                                        <p className="text-left col-6 text-warning">{service.name}</p>
                                        <p className="text-right col-6 text-warning">{service.price} ₹</p>
                                    </div>
                                )
                            })}
                            <div className="row">
                                <strong className="text-left col-6 text-danger">Total Pricing</strong>
                                <strong className="text-right col-6 text-danger">{this.state.total} ₹</strong>
                            </div>
                        </div>

                        <h2 style={{ margin: 20 }} className="text-success">Additional Services</h2>
                        {this.state.additionalServices.map((service,index) => {
                            return (
                                <div style={{ margin: 20 }}>
                                    <h4 className="text-left">{service.Main}</h4>
                                    <div className="card">
                                        <div className="card-body">
                                            <img src={service.image} style={{ height: 100, width: 100 }} />
                                            <p className="text-center">{service.name}</p>
                                            <strong className="text-right">{service.price} ₹</strong>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    : <h1>Loading.....</h1>}
            </div>
        )
    }
}

export default List
