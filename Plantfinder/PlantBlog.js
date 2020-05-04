import React, { Component } from 'react'
import { ScrollView, Dimensions, PixelRatio, StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native'
import axios from 'axios';
import style from './style'
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import ImageZoom from 'react-native-image-pan-zoom';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const uid = DeviceInfo.getUniqueId();   //ดึง id ของเครื่อง user มาใช้เป็น user id 

export default class PlantBlog extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    state = {
        info: null,
        class: null,
        uri: null,
    };
    constructor(props) {
        super(props)
        //this.getAnimalClass()//เรียกใช้ function getAnimalClas เมื่อเข้ามาถึงหน้านี้ทันที
        this.getplantInfo()
        //console.log("stateClass:", this.state.class)
    }
    getplantInfo() {
        const id = uid;
        const url = `https://flowey-server.herokuapp.com/getimg/${id}`;//url เชื่อม api กับ database โดยเพิ่ม animalClass ต่อท้ายเพื่อระบุสัตว์ที่จะดึงข้อมูล

        const url2 = url;
        axios.get(url2)
            .then((Data) => {
                console.log("plant:", Data.data);
                //const imageuri = Data.data;//ให้ animalClass มีค่าเป็นข้อมูลของสัตว์ที่ดึงมาจาก api
                // console.log("animalInfo:", animalInfo);
                // this.setState({ info: imageuri });//set state ให้ info มีค่าเป็นข้อมูลที่ดึงมาจาก api
                this.setState({
                    uri: Data.data
                })
            })
            .catch(err => {
                console.log('plant error', err);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                 <ScrollView style={styles.scrollView}>
                <Text style={styles.menubtn}> ช่อกุหลาบนั้นสำคัญไฉน  </Text>
                <Text style={styles.menubtn}> ทำไมต้องให้ในวันวาเลนไทน์? </Text>
                <Image //source={{ uri: this.state.uri }}
                source={require('./image/flowers.jpg')}
                    style={[styles.avatar, styles.avatarContainer, ]}>
                </Image>
                        <Text style={styles.text}>วันแห่งความรักมีได้ทุกวัน แต่ถึงอย่างนั้นก็มีวันที่พิเศษมาก ๆ 
                        นั่นก็คือวันที่ 14 กุมภาพันธ์ หรือวันวาเลนไทน์ที่คนทั่วโลกต่างก็ยกให้เป็นวันแห่งความรักนั่นเองค่ะ 
                        และช่อกุหลาบกับวันวาเลนไทน์ก็ถือได้ว่าเป็นของคู่กัน ทำให้ไม่แปลกใจเลยว่าทำไมเวลามองไปทางไหน 
                        เราก็มักจะเห็นดอกไม้แสนสวย กลิ่นหอมชนิดนี้อยู่ในมือของคู่รักเต็มไปหมด 
                        แต่จะมีใครรู้บ้างว่าทำไมเจ้าดอกไม้ชนิดนี้ถึงได้กลายเป็นตัวแทนของความรัก 
                        ความคิดถึงให้แก่คนทุกเพศทุกวัย และธรรมเนียมการมอบดอกกุหลาบเริ่มต้นขึ้นตั้งแต่ตอนไหน 
                        ถ้าอยากรู้ล่ะก็ LoveYouFlower™ จะมาเล่าประวัติของวันแห่งความรักนี้ให้ทุกคนได้อ่านกันค่ะวันแห่งความรักมีได้ทุกวัน แต่ถึงอย่างนั้นก็มีวันที่พิเศษมาก ๆ 
                        นั่นก็คือวันที่ 14 กุมภาพันธ์ หรือวันวาเลนไทน์ที่คนทั่วโลกต่างก็ยกให้เป็นวันแห่งความรักนั่นเองค่ะ 
                        และช่อกุหลาบกับวันวาเลนไทน์ก็ถือได้ว่าเป็นของคู่กัน ทำให้ไม่แปลกใจเลยว่าทำไมเวลามองไปทางไหน 
                        เราก็มักจะเห็นดอกไม้แสนสวย กลิ่นหอมชนิดนี้อยู่ในมือของคู่รักเต็มไปหมด 
                        แต่จะมีใครรู้บ้างว่าทำไมเจ้าดอกไม้ชนิดนี้ถึงได้กลายเป็นตัวแทนของความรัก ความคิดถึงให้แก่คนทุกเพศทุกวัย 
                        และธรรมเนียมการมอบดอกกุหลาบเริ่มต้นขึ้นตั้งแต่ตอนไหน ถ้าอยากรู้ล่ะก็ LoveYouFlower™ 
                        จะมาเล่าประวัติของวันแห่งความรักนี้ให้ทุกคนได้อ่านกันค่ะ
                        </Text>

                        </ScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    fontS: {
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: 'AbrilFatface'
    },
    container: {
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: 'white',
        alignItems: 'center',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        flexWrap: 'wrap',
        fontFamily: "Opun"
    },
    text: {
        marginTop:15,
        fontSize: 17,
        paddingBottom: 15,
        fontFamily: "Opun",
        marginLeft:15,
        marginRight:15
    },
    textBox: {
        height: hp('40%'),
        width: wp('100%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        // marginTop:100,
        borderRadius: 6,
        marginBottom: 5,
        backgroundColor: 'white',
        // borderWidth: 7,
        // borderColor: '#BA55D3',
        // borderStyle: 'dotted',

    },
    textBoxbackground: {
        height: '100%',
        width: '100%',

    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: wp('100%'),
        height: hp('40%'),
        backgroundColor: '#E8ECF0'
    },
    justContain: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,

    },
    menubtn: {
        width: '100%',
       // height: '15%',
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'flex-start',
        padding: 3,
        textAlign: 'left',
        fontSize: 30,
        fontFamily: 'OpenSans_Light',
        // textDecorationLine: 'underline',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    showPic: {
        marginTop: 10,
        width: '48%',
        height: '89%',
        backgroundColor: 'white',
        borderRadius: 6,
    },
    justPic: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },

})