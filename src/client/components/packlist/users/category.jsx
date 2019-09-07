import React from 'react';
import PropTypes from 'prop-types';
import {Card,Col,Row,Form} from "react-bootstrap";
import mainStyles from "../../../style.scss";
import Item from './item';
import ItemQty from './item-qty';
import ItemChecked from './item-checked';

class Category extends React.Component {
    constructor(){
        super();
        this.state = {
            items:null
        }

    }

    componentDidMount(){
        let items = this.props.items.sort((a,b)=> a.name.toLowerCase()<b.name.toLowerCase()? -1:1).sort((x,y)=>x.packed === y.packed? 0 : (x.packed? 1 : -1));
        this.setState({items:items})
    }


    deleteItem(e,item_id){
        let updatedItems = this.state.items;
        updatedItems = updatedItems.filter(item => item.id !== item_id)
        console.log("filtered", updatedItems)
        this.setState({items:updatedItems});
        this.props.deleteItem(item_id);
    }

	render() {
        let items = this.state.items? this.state.items.map((item, index)=> {
            let itemName = <Item item_name={item.name} item_id={item.id} submitNameEdit={this.props.submitNameEdit}/>
            let itemQty = <ItemQty item_quantity={item.quantity} item_id={item.id} submitQtyEdit={this.props.submitQtyEdit}/>
            let itemChecked = <ItemChecked item_packed={item.packed} packItem={this.props.packItem} item_id={item.id} />
			return(
				<Row key={item.id}>
					<Col xs={1}>
                            {itemChecked}
					</Col>
					<Col xs={2}>
						{itemQty}
					</Col>
					<Col xs={8} className="pl-0">
						{itemName}
					</Col>
                    <Col xs={1}>
                        <i className={`bx bx-x ${mainStyles["delete-button"]}`} onClick={(e)=>{this.deleteItem(e,item.id)}}></i>
                    </Col>
				</Row>
			);
		}) : "";
		return (
			<Card className={mainStyles.listCard}>
				<Card.Body>
					<Row>
						<Col>
							<h4>{this.props.category}</h4>
						</Col>
					</Row>
					{items}
				</Card.Body>
			</Card>

		);
	}
}
Category.propTypes ={
	items: PropTypes.array,
	category: PropTypes.string,
	packItem: PropTypes.func,
};
export default Category;