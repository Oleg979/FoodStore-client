import React, { Component } from 'react'
import FoodCard from "./Card"
import SearchBar from './SearchBar'
import { Toastme } from 'toastmejs'
import ItemModal from './ItemModal'

export default class CardList extends Component {
    state = {
        items: [],
        searchedItems: [],
        search: false,
        productModalShow: false,
        modalItem: {}
    }



    setProductModalShow = (bool, item) => {
        this.setState({ productModalShow: bool, modalItem: item ? item : {} })
        if (!bool) fetch(`http://localhost:5000/item`, {
            method: "GET",
        })
            .then(data => data.json())
            .then(items => {
                this.setState({ items })
                localStorage.setItem("items", JSON.stringify(items))
            })
    }

    noSearch = () => this.setState({ search: false, searchedItems: [] })

    search = ({ name, price, type, onlyComments }) => {
        let items = this.state.items;
        items = items.filter(item => item.price <= price);
        if (name != "") {
            items = items.filter(item => item.title.toLowerCase().indexOf(name.toLowerCase()) != -1);
        }
        if (type) {
            items = items.filter(item => item.type == type);
        }

        this.setState({
            search: true,
            searchedItems: items
        })
        const config = document.body.clientWidth <= 630 ? {
            timeout: 2000,
            positionY: "bottom",
            positionX: "center",
            distanceY: 20,
            distanceX: 20,
            zIndex: 100,
            theme: "default"
        } : {
                timeout: 2000,
                positionY: "bottom",
                positionX: "right",
                distanceY: 20,
                distanceX: 20,
                zIndex: 100,
                theme: "default"
            };
        const mytoast = new Toastme(config);
        mytoast.info("Найдено товаров: " + items.length)
    }
    componentDidMount() {
        let cache = localStorage.getItem("items");
        if (cache) this.setState({ items: JSON.parse(cache) }, () => {
            fetch(`http://localhost:5000/item`, {
                method: "GET",
            })
                .then(data => data.json())
                .then(items => {
                    this.setState({ items })
                    localStorage.setItem("items", JSON.stringify(items))
                })
        })
        else fetch(`http://localhost:5000/item`, {
            method: "GET",
        })
            .then(data => data.json())
            .then(items => {
                this.setState({ items })
                localStorage.setItem("items", JSON.stringify(items))
            })
    }
    render() {
        return (
            <>
                <div>
                    <SearchBar search={this.search} noSearch={this.noSearch} />

                    <div className="cardlist">
                        {this.state.search && this.state.searchedItems.map(item => (
                            <FoodCard setProductModalShow={this.setProductModalShow} incNumOfItems={this.props.incNumOfItems} {...item} key={item._id} wholeItem={item} />
                        ))}
                        {!this.state.search && this.state.items.map(item => (
                            <FoodCard setProductModalShow={this.setProductModalShow} incNumOfItems={this.props.incNumOfItems} {...item} key={item._id} wholeItem={item} />
                        ))}
                    </div>
                    {}
                </div>
                <ItemModal show={this.state.productModalShow} setProductModalShow={this.setProductModalShow} item={this.state.modalItem} incNumOfItems={this.props.incNumOfItems} />
            </>
        )
    }
}
