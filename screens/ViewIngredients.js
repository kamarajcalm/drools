import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView,Alert} from 'react-native';
const { height, width } = Dimensions.get('window')
import settings from '../AppSettings'
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const gradients = settings.gradients
const primaryColor = settings.primaryColor
const secondaryColor = settings.secondaryColor
const fontFamily = settings.fontFamily
const themeColor = settings.themeColor
const url =settings.url
import { StatusBar, } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import orders from '../data/orders'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import HttpsClient from '../HttpsClient';

const screenHeight = Dimensions.get("screen").height
class ViewIngredients extends Component {
    constructor(props) {
        super(props);
        let item = props.route.params.item
        console.log(item,"ppp")
        this.state = {
            item,
            modal:false,
            Quantity:"",
            expiryDate:"",
            show:false,
            price:"",
            items:[],
            edit:true,
            selectedItem:null,
          
        };
    }
    showSimpleMessage(content, color, type = "info", props = {}) {
        const message = {
            message: content,
            backgroundColor: color,
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };

        showMessage(message);
    }
    getItems = async()=>{
        const api = `${url}/api/drools/ingridientsub/?main=${this.state.item.id}&stock=inStock`
        let data = await HttpsClient.get(api)
        if(data.type =="success"){
            this.setState({ items:data.data})
        }
    }
    addItem = async()=>{
        if (this.state.Quantity == "") {
            return this.showSimpleMessage("Please add Quantity", "#dd7030",)
        }
        if (this.state.price == "") {
            return this.showSimpleMessage("Please add price", "#dd7030",)
        }
        let api = `${url}/api/drools/ingridientsub/`
        let sendData ={
            quantity:Number(this.state.Quantity),
            price:Number(this.state.price),
            expiry_date:this.state.expiryDate,
            main:this.state.item.id
        }
        let post = await HttpsClient.post(api,sendData)
        if(post.type =="success"){
            this.setState({ modal: false, Quantity: "", price: "", expiryDate:""})
            this.getItems()
            return this.showSimpleMessage("Added SuccessFully", "#00A300", "success")
        }else{
            return this.showSimpleMessage("Try again", "#dd7030",)
        }
    }
    edit = async()=>{
        if (this.state.Quantity == "") {
            return this.showSimpleMessage("Please add Quantity", "#dd7030",)
        }
        if (this.state.price == "") {
            return this.showSimpleMessage("Please add price", "#dd7030",)
        }
        let sendData = {
            quantity: Number(this.state.Quantity),
            price: Number(this.state.price),
            expiry_date: this.state.expiryDate,
            main: this.state.item.id
        }
        let api = `${url}/api/drools/ingridientsub/${this.state.selectedItem.id}/`
        let patch = await HttpsClient.patch(api,sendData)
        if(patch.type =="success"){
            this.setState({ modal: false, Quantity: "", price: "", expiryDate: "" })
            this.getItems()
            return this.showSimpleMessage("Edited SuccessFully", "#00A300", "success")
        }else{
            return this.showSimpleMessage("Try again", "#dd7030",)
        }
    }
    backDrop =()=>{
        if(this.state.edit){
            this.setState({ modal: false, Quantity: "", price: "", expiryDate: "" })
        }else{
            this.setState({ modal:false})
        }
    }
    validateType =()=>{
        if (this.state.item.type == 'Gram'){
            return (
                <View style={{ padding: 20 }}>
                    <Text style={[styles.text]}>Enter Gram</Text>
                    <TextInput
                        keyboardType={"phone-pad"}
                        value={this.state.Quantity}
                        style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                        selectionColor={primaryColor}
                        onChangeText={(Quantity) => { this.setState({ Quantity }) }}
                    />
                </View>
            )
        }
        return (
            <View style={{ padding: 20 }}>
                <Text style={[styles.text]}>Enter Pieces</Text>
                <TextInput
                    keyboardType={"phone-pad"}
                    value={this.state.Quantity}
                    style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                    selectionColor={primaryColor}
                    onChangeText={(Quantity) => { this.setState({ Quantity }) }}
                />
            </View>
        )
    }
    ItemAddModal =()=>{
        return(
            <Modal
                statusBarTranslucent={true}
                deviceHeight={screenHeight}
                isVisible={this.state.modal}
                onBackdropPress={() => {this.backDrop() }}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ height: height * 0.6, backgroundColor: "#eee", borderRadius: 10, }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >

                            {
                                this.validateType()
                            }
                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Price</Text>
                                <TextInput
                                    keyboardType={"phone-pad"}
                                    value={this.state.price}
                                    style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 }}
                                    selectionColor={primaryColor}
                                    onChangeText={(price) => { this.setState({ price }) }}
                                />
                            </View>
                            <View style={{ padding: 20 }}>
                                <Text style={[styles.text]}>Enter Expiry date</Text>
                                <TouchableOpacity
                                    onPress ={()=>{this.setState({modal:false},()=>{
                                        setTimeout(()=>{
                                            this.setState({show:true})
                                        },500)
                                    })}}
                                    style={{ height: height * 0.05, width: width * 0.8, backgroundColor: "#fafafa", borderRadius: 5, marginTop: 5 ,flexDirection:"row",paddingHorizontal:10,alignItems:"center",justifyContent:"space-between"}}
                                >
                                     <View>
                                         <Text style={[styles.text,{color:"#000"}]}>{this.state.expiryDate}</Text>
                                     </View>
                                     <View>
                                        <MaterialIcons name="date-range" size={24} color="black" />
                                     </View>
                                </TouchableOpacity>
                            </View>
                        
                            <View style={{ alignItems: "center" }}>
                                {!this.state.edit?<TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                    onPress={() => { this.addItem() }}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>Add</Text>
                                </TouchableOpacity>:
                                    <TouchableOpacity style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: primaryColor }}
                                        onPress={() => { this.edit() }}
                                    >
                                        <Text style={[styles.text, { color: "#fff" }]}>Edit</Text>
                                    </TouchableOpacity>
                                }
                            </View>

                        </ScrollView>
                    </View>

                </View>
            </Modal>
        )
    }
    hideDatePicker = () => {
        this.setState({ show: false },()=>{
            setTimeout(()=>{
                this.setState({modal:true})
            },500)
        })
    };
    handleConfirm = (date) => {
        this.setState({ expiryDate: moment(date).format("YYYY-MM-DD") })
        this.hideDatePicker();
    };
    componentDidMount(){
        this.getItems()
    }
    header =()=>{
        return(
            <View style={{flexDirection:"row",paddingVertical:20,}}>
               <View style={{flex:0.1,alignItems:"center",justifyContent:"center"}}>
                   <Text style={[styles.text,{color:"#000"}]}>#</Text>
              </View> 
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>Quantity</Text>
                </View>
               
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>Price</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>Status</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                    <Text style={[styles.text, { color: "#000" }]}>Edit</Text>
                </View>
                <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                  
                </View>
            </View>
        )
    }
    editItem =(item)=>{
        this.setState({ 
            Quantity: item?.quantity?.toString(),
            price: item?.price?.toString(),
            expiryDate:item?.expiry_date?.toString(),
            edit:true,
            selectedItem:item
        },()=>{
            this.setState({modal:true})
        })
    }
    deleteItem = async(item, index)=>{
       let duplicate =this.state.items
       let api = `${url}/api/drools/ingridientsub/${item.id}/`
       let del= await HttpsClient.delete(api)
       if(del.type =="success"){
           duplicate.splice(index,1)
           this.setState({ items:duplicate})
           return this.showSimpleMessage("deleted SuccessFully", "#00A300", "success")
       }else{
           return this.showSimpleMessage("try again ", "#00A300", "success")
       }
    }
    createAlert = (item, index) => {
        Alert.alert(
            "Do you want to delete?",
            ``,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => { this.deleteItem(item, index) } }
            ]
        );
    }
    render(){
        return(
            <View style={{flex:1}}>

       
            <LinearGradient
                style={{ height: height * 0.12, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                colors={gradients}
            >
                <View style={{ marginTop: Constants.statusBarHeight, flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Ionicons name="caret-back" size={24} color={secondaryColor} />
                    </TouchableOpacity>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                        <Text style={[styles.text, { color: "#fff", fontSize: 18 }]}>{this.state.item.title}</Text>

                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>

                    </View>
                </View>
            </LinearGradient>
                  <FlatList 
                     ListHeaderComponent={this.header()}
                     data={this.state.items}
                     keyExtractor ={(item,index)=>index.toString()}
                     renderItem ={({item,index})=>{
                         return(
                             <View style={{ flexDirection: "row", paddingVertical: 20, }}>
                                 <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                                     <Text style={[styles.text, { color: "#000" }]}>{index+1}</Text>
                                 </View>
                                 <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                     <Text style={[styles.text, { color: "#000" }]}>{item.quantity}</Text>
                                 </View>

                                 <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                     <Text style={[styles.text, { color: "#000" }]}>{item.price}</Text>
                                 </View>
                                 <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                     <Text style={[styles.text, { color: "#000" }]}>{item.status}</Text>
                                 </View>
                                 <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
                                  onPress={()=>{this.editItem(item)}}
                                 >
                                     <Entypo name="edit" size={24} color={primaryColor} />
                                 </TouchableOpacity>
                                 <TouchableOpacity style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
                                  onPress ={()=>{this.createAlert(item,index)}}
                                 >
                                     <Entypo name="circle-with-cross" size={24} color="red" />
                                 </TouchableOpacity>
                             </View>
                         )
                    }}
                  
                  />
                   {
                        this.ItemAddModal()
                   }
                <View style={{
                    position: "absolute",
                    bottom: 50,
                    left: 20,
                    right: 20,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: 20
                }}>
                    <TouchableOpacity
                        onPress={() => { this.setState({ modal: true ,edit:false}) }}
                    >
                        <AntDesign name="pluscircle" size={40} color={primaryColor} />
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    isVisible={this.state.show}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
    }
}
export default connect(mapStateToProps, { selectTheme })(ViewIngredients);