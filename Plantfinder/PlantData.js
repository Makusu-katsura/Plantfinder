import React, { Component } from 'react'
import { ScrollView, Dimensions, PixelRatio, StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native'
import axios from 'axios';
import style from './style'
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import ImageZoom from 'react-native-image-pan-zoom';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const uid = DeviceInfo.getUniqueId();   //ดึง id ของเครื่อง user มาใช้เป็น user id 
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

    // getAnimalClass() { // get class ของ animal มาเพื่อ reference ว่าเป็นสัตว์ตัวไหน
    //     const iduser = uid;
    //     const url = `https://zoochatbotpython.appspot.com/getbyuser/animal/${iduser}`;   //url เชื่อม api กับ database โดยเพิ่ม user id ต่อท้ายเพื่อระบุตัวตน
    //     console.log("coming:", url);
    //     const urll = url;
    //     axios.get(urll)
    //         .then((Data) => {
    //             console.log("Aniclass:", Data.data.animal);
    //             const animalClass = Data.data.animal; //ให้ animalClass มีค่าเป็นข้อมูล class สัตว์ที่ดึงมาจาก api
    //             console.log("animalClass:", animalClass);
    //             this.setState({ class: animalClass }); //set state ให้ class  มีค่าเป็นข้อมูลที่ดึงมาจาก api
    //             console.log("classFix:", this.state.class)
    //             console.log("finished!");
    //             const aniclass = this.state.class;
    //             console.log("aniRe:", aniclass);//check ค่าใน state
    //             this.getAnimalInfo(aniclass);//นำค่าใน state ไปเรียกใช้ function 
    //         })
    //         .catch((err) => {
    //             console.log('aniclass error', err);
    //         })
    // }
    // getAnimalInfo(animalClass) { //นำ class ที่ได้มาไป get ข้อมูลของสัตว์ตัวนั้น
    //     const url = `https://zoochatbotpython.appspot.com/getanimalinfo/${animalClass}`;//url เชื่อม api กับ database โดยเพิ่ม animalClass ต่อท้ายเพื่อระบุสัตว์ที่จะดึงข้อมูล
    //     const url2 = url;
    //     axios.get(url2)
    //         .then((Data) => {
    //             console.log("Animal:", Data.data.info);
    //             const animalInfo = Data.data.info;//ให้ animalClass มีค่าเป็นข้อมูลของสัตว์ที่ดึงมาจาก api
    //             console.log("animalInfo:", animalInfo);
    //             this.setState({ info: animalInfo });//set state ให้ info มีค่าเป็นข้อมูลที่ดึงมาจาก api
    //         })
    //         .catch(err => {
    //             console.log('Animal error', err);
    //         });

    // }
    getplantInfo() {
        const id = uid;
        const url = `https://flowey-server.herokuapp.com/getflower/${id}`;//url เชื่อม api กับ database โดยเพิ่ม animalClass ต่อท้ายเพื่อระบุสัตว์ที่จะดึงข้อมูล

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
                        <Image //source={{ uri: this.state.uri }}
                        source={require('./image/exflower/Daffodil.jpg')}
                            style={[styles.avatar, styles.avatarContainer, ]}>
                        </Image>
                    </View>

                    <View style={styles.textBox}>
                        <ScrollView style={styles.scrollView}>
                            <Text style={styles.text}>ชื่อ: ดอกดารารัตน์</Text>
                            <Text style={styles.text}>สี:เหลือง</Text>
                            <Text style={styles.text}>ชื่อวิทยาศาสตร์: Narcissus poeticus</Text>
                            <Text style={styles.text}>ความหมาย: ดอกแดฟฟอดิล นิยมใช้มอบให้แก่คนที่รัก เพื่อบอกความในใจว่า อยากมอบความรักให้โดยไม่เคยต้องการสิ่งใดตอบแทน อีกทั้งยังหมายถึง เกียรติยศ ความกล้าหาญ สัญลักษณ์ของความหวัง อีกด้วย </Text>
                            <Text style={styles.text}>โอกาส:</Text>
                        </ScrollView>

                    </View>
                </View>
            </ImageBackground>

        );
        // return (
        //     <ImageBackground source={require('./image/LifeisVeryBeautiful.jpg')} style={styles.backgroundImage}>

        //         <ImageZoom style={styles.dataGet}
        //             cropWidth={Dimensions.get('window').width}
        //             cropHeight={Dimensions.get('window').height}
        //             imageWidth={Dimensions.get('window').width}
        //             imageHeight={Dimensions.get('window').height * 9 / 10}
        //         >
        //             <Image source={{ uri: this.state.uri }} style={{
        //                 width: wp('100%'),
        //                 height: hp('90%')
        //             }}></Image>
        //         </ImageZoom>
        //     </ImageBackground>
        // )
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