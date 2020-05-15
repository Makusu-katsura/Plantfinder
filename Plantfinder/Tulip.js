import React, { Component } from 'react'
import { ScrollView, Dimensions, PixelRatio, StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native'
import axios from 'axios';
import style from './style'
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import ImageZoom from 'react-native-image-pan-zoom';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const uid = DeviceInfo.getUniqueId();   //ดึง id ของเครื่อง user มาใช้เป็น user id 
const fake =
{name: 'ดอกทิวลิป',
color: 'มีหลายสี เช่น แดง, ส้ม, ขาว',
sciname: 'Tulipa',
meaning: 'ดอกทิวลิป เป็นสัญลักษณ์ของ  จินตนาการ ความใฝ่ฝัน คู่รักที่สมบูรณ์แบบ  และ ความรักที่เปิดเผย',
giving: 'มอบให้เพื่อความมงคล แสดงถึงความรัก ความมั่นคง' }

export default class PlantData extends Component {
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
        const json={ color: 0, meaning: 0, giving: 0 }
        
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
            <ImageBackground source={require('./image/LifeisVeryBeautiful.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={style.justContain}>
                        <Text style={styles.menubtn}><Text> Information </Text></Text>
                    </View>
                    <View style={styles.container}>
                        <Image source={require('./image/exflower/Tulip.jpg')}
                     //   source={require('./image/exflower/Daffodil.jpg')}
                            style={[styles.avatar, styles.avatarContainer, ]}>
                        </Image>
                    </View>

                    <View style={styles.textBox}>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.text}>ชื่อ: {fake.name} </Text>
                            <Text style={styles.text}>สี: {fake.color}</Text>
                            <Text style={styles.text}>ชื่อวิทยาศาสตร์: {fake.sciname}</Text>
                            <Text style={styles.text}>ความหมาย: {fake.meaning} </Text>
                            <Text style={styles.text}>โอกาส: {fake.giving}</Text>
                        </ScrollView>

                    </View>
                </View>
            </ImageBackground>

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
        margin: 5,
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        marginTop: 20,
        flexWrap: 'wrap',
        marginStart: 20,
        marginLeft: 20,
        fontFamily:"Opun"
    },
    text: {
        fontSize: 17,
        paddingBottom:15,
        fontFamily:"Opun"
    },
    textBox: {
        height: hp('32%'),
        width: wp('93%'),
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
        width: wp('65%'),
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
        margin: 10,
        width: '65%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 40,
        fontFamily: 'OpenSans_Light',
        // textDecorationLine: 'underline',
        borderWidth: 7,
        borderColor: '#BA55D3',
        borderStyle: 'dotted'
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
    justWord: {
        width: '98%',
        height: '80%',
    },
    showWord: {
        width: '100%',
        height: '65%',
        backgroundColor: 'white',
        borderRadius: 6,
    },
    dataGet: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})