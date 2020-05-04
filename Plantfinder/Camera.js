import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, ImageBackground, } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from './style'
import AwesomeAlert from 'react-native-awesome-alerts';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Icon } from 'react-native-elements'
import ProgressLoader from 'rn-progress-loader';
const uid = DeviceInfo.getUniqueId();   //ดึง id ของเครื่อง user มาใช้เป็น user id 
export default class Camera extends React.Component {
    static navigationOptions = {
        headerShown: false,
        headerMode: 'none'
    }
    constructor(props) {
        super(props);
        this.launchcamera()
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.state = {
            //showAlert: true,
            avatarSource: null, photo: null, isdisabled: true, bgColor: false,
            visible: false

        };
    }

    bgColor1(bgColor) { //เป็นการแสดงปุ่มของการแสดงข้อมูล โดยถ้าหากยังไม่ทำการอัพโหลดข้อมูล ตัว stage จะแสดงปุ่มเป็นสีเทา ถ้าหากอัพโหลดแล้วจะเป็น สีเขียว
       
        if (this.state.bgColor == true) {
            return styles.dataButton;
        }
        else {
            return styles.dataDefault;
        }
    }
    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    UploadPhoto() {
        console.log('id', uid);
        const url = "https://flowey-server.herokuapp.com/upimg";  //url เชื่อม api กับ database
        const image = {
            uri: this.state.photo.uri,
            type: 'image/jpg',
            name: this.state.photo.fileName
        }   //dict รูปภาพ ประกอบไปด้วย ตำแหน่งของรูป,ชนิดของไฟล์,ชื่อไฟล์
        const imgBody = new FormData(); //form ในการส่งรูปประกอบไปด้วย รูป และ user id 
        imgBody.append('image', image);
        imgBody.append('uid', uid);
        imgBody.append('uri', this.state.photo.uri);
        imgBody.append('filename', this.state.photo.fileName);
        console.log('imgBody:', imgBody);
        console.log('filename', this.state.photo.fileName)
        //alert("waiting for respond.")
        this.setState({ visible: !this.state.visible })
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: imgBody

        }) //ติดต่อ api ส่งรูปภาพไปยัง cloud ซึ่งดึงได้แค่ทีละรูป จึงต้องสร้าง form เพื่อใช้เป็น pattern ในการส่งรูป
            .then((response) => {
                console.log('response upload', response);
                alert("อัพโหลดเสร็จเรียบร้อย")  //เช็คสถานะการอัพโหลด หากสำเร็จให้ alert successful
                this.setState({ isdisabled: false, bgColor: true, visible: !this.state.visible });
            })
            .catch((error) => {
                console.error(error);
                alert("เกิดความผิดพลาด")
                this.setState({ photo: null });
            });
    }
    launchcamera() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: './plantfinder', //แก้ที่อยู่ของรูปภาพที่ถ่ายให้ไปอยู่ใน folder zooimage ที่สร้างเพิ่มในมือถือ เมื่อใช้งานกล้องครั้งแรก 

            },
        };
        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);
            this.setState({ bgColor: false, isdisabled: true, avatarSource: null });
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri }; //เมื่อถ่ายภาพเสร็จจะให้ตัวแปร source เก็บ path ของรูปเอาไว้
                this.setState({ photo: response }); // set ให้ตัวแปร photo มีค่าเป็นรูปภาพที่ถ่ายมา
                console.log("response", response);
                console.log("uri:", response.uri.replace('file://', ''));
                this.UploadPhoto(); //เรียกใช้ function upload เพื่อส่งที่อยู่และชื่อรูปขึ้นไป predict บน cloud 
                this.setState({
                    avatarSource: source,   //นำ path ของรูปมา set state เพื่อแสดงในกรอบสี่เหลี่ยม
                });
            }
        });


    }
    selectPhotoTapped() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: './plantfinder', //แก้ที่อยู่ของรูปภาพที่ถ่ายให้ไปอยู่ใน folder zooimage ที่สร้างเพิ่มในมือถือ เมื่อใช้งานกล้องครั้งแรก 

            },
        };

        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);
            this.setState({ bgColor: false, isdisabled: true, avatarSource: null });
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri }; //เมื่อถ่ายภาพเสร็จจะให้ตัวแปร source เก็บ path ของรูปเอาไว้
                this.setState({ photo: response }); // set ให้ตัวแปร photo มีค่าเป็นรูปภาพที่ถ่ายมา
                console.log("response", response);
                console.log("uri:", response.uri.replace('file://', ''));
                this.UploadPhoto(); //เรียกใช้ function upload เพื่อส่งที่อยู่และชื่อรูปขึ้นไป predict บน cloud 
                this.setState({
                    avatarSource: source,   //นำ path ของรูปมา set state เพื่อแสดงในกรอบสี่เหลี่ยม
                });
            }
        });
    }
    oninfopress() {
        this.props.navigation.navigate('Data', { name: 'user' }),
            this.setState({
                avatarSource: null,
                isdisabled: true,
                bgColor: false
            });
    }
    render() {
        const { navigate } = this.props.navigation;
        const { showAlert } = this.state;
        return (
            <ImageBackground source={require('./image/LifeisVeryBeautiful.jpg')} style={style.backgroundImage}>
                <View style={styles.container}>
                    <View style={style.justContain}>
                        {/* <Image source={require('./Image/takepic1.png')} style={styles.logo}></Image> */}
                        <Text style={styles.menubtn}><Text> TAKE PICTURE </Text></Text>
                    </View>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View
                            style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ? (
                                <View>
                                    <Text style={styles.styleIm}>กดตรงนี้เพื่อถ่ายรูป </Text>
                                    <Text style={styles.styleIm}>หากต้องการถ่ายรูปใหม่ให้กดตรงนี้อีกครั้ง</Text>

                                </View>
                            ) : (
                                    <View>
                                        <Image style={styles.avatar} 
                                        //source={this.state.avatarSource} 
                                        source={require('./image/exflower/Daffodil.jpg')}
                                        />

                                        <ProgressLoader
                                            visible={this.state.visible}
                                            isModal={true} isHUD={true}
                                            hudColor={"#000000"}
                                            color={"#FFFFFF"} />
                                    </View>
                                )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.isdisabled} style={this.bgColor1()} onPress={() => { this.oninfopress(); }} >
                        <Text style={styles.fontTitle}>View Information</Text>

                    </TouchableOpacity>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Plant Notify"
                        message="คลิ๊ก ! พื้นที่สีเทาเพื่อทำการถ่ายรูป. โปรดถ่ายรูปให้เห็นดอกไม้ด้วยครับ เมื่อถ่ายรูปเสร็จแล้วต้องรอจนกว่าจะขึ้นอัพโหลดเสร็จเรียบร้อยแล้วจึงกด View Information เพื่อดูข้อมูลสัตว์ได้ครับ"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="รับทราบ"
                        confirmButtonColor="#2DCD87"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                    <View style={style.bottomleft}>
                        <Icon
                            name='local-florist'
                            type='material'
                            color='#fff'
                            onPress={() => navigate('Data', { name: 'user' })}
                        />
                        <View style={style.bottomright}>
                            <Icon
                                name='home'
                                type='material'
                                color='#fff'
                                onPress={() => navigate('Home', { name: 'user' })}
                                containerStyle={{ marginHorizontal: 16 }}
                            />
                            <Icon
                                name='search'
                                type='material'
                                color='#fff'
                                onPress={() => navigate('Plant', { name: 'user' })}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        margin: hp('4%'),
        flex: 1,
        alignItems: 'center',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: wp('85%'),
        height: hp('50%'),
        backgroundColor: '#E8ECF0'
    },
    menubtn: {
        marginLeft: 20,
        width: wp('50%'),
        height: hp('13%'),
        backgroundColor: 'white',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4.7%'),
        fontFamily: 'OpenSans_Light'
    },
    dataButton: {
        marginTop: '3%',
        marginBottom: '4%',
        width: wp('85%'),
        height: hp('8%'),
        backgroundColor: '#2DCD87',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4%'),
        fontFamily: 'OpenSans_Light',
        alignItems: 'center'
    },
    dataDefault: {
        marginTop: '3%',
        marginBottom: '4%',
        width: wp('85%'),
        height: hp('8%'),
        backgroundColor: '#636465',
        borderRadius: 6,
        justifyContent: 'center',
        padding: 3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: hp('4%'),
        fontFamily: 'OpenSans_Light',
        alignItems: 'center',
        color: '#A5A6A7'
    },
    logo: {
        width: wp('35%'),
        height: hp('20%'),
        resizeMode: 'stretch'
    },
    fontTitle: {
        color: 'white',
        fontFamily: 'OpenSans_Bold',
        fontSize: hp('4%'),
        marginTop: '4%'
    },
    styleIm: {
        fontSize: hp('2.5%'),
        textAlign: 'center',
    },

});