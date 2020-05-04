import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity, ImageBackground, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import Camera from './Camera'
import style from './style'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import PlantData from './PlantData'
import PlantMenu from './PlantMenu'
import PlantBlog from './PlantBlog'
export class Menu extends Component {
    static navigationOptions = {    //เป็นการประกาศตัวแปรสำหรับการตั้งค่าของ body navigationOption
        headerShown: false,
        headerMode: 'none'
    }
    renderListHeader() {
        return (
            <View>
                {/* <Image style={{ width: '100%', height: 90, resizeMode: 'contain', marginBottom:40,marginTop:40}}
                    source={require('./image/5e6b982ecf10c.png')} /> */}
            </View>
        )
    }
    renderItem(item) {
        const { navigate } = this.props.navigation;
        return (
            <View>
            
            <TouchableOpacity  onPress={() => navigate('Blog', { name: 'user' })}>
            <View style={style.Cardstyle}>
                <View style={{ flexDirection: 'row', margin: 16 }}>
                    <Image
                        source={require('./image/flowers.jpg')}
                        style={style.listavatar} />
                    <View style={style.listtitle}>
                        <Text style={{ color: '#000000EE' }}>ช่อกุหลาบนั้นสำคัญไฉน </Text>
                        <Text style={{ color: '#000000AA' }}>ทำไมต้องให้ในวันวาเลนไทน์?</Text>
                    </View>
                </View>
                <Image
                    source={require('./image/flowers.jpg')}
                    style={{ width: '100%', height: 200 }} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigate('Blog', { name: 'user' })}>
                <View style={style.Cardstyle}>
                    <View style={{ flexDirection: 'row', margin: 16 }}>
                        <Image
                            source={require('./image/purple_flowers-Summer_plant.jpg')}
                            style={style.listavatar} />
                        <View style={style.listtitle}>
                            <Text style={{ color: '#000000EE' }}>มอบดอกไม้แทนใจ</Text>
                            <Text style={{ color: '#000000AA' }}>ต้องโอกาสไหนถึงจะดี?</Text>
                        </View>
                    </View>
                    <Image
                        source={require('./image/Spring_Purple_Flowers.jpg')}
                        style={{ width: '100%', height: 200 }} />
                </View>
            </TouchableOpacity>
        
        </View>
        );
    }
    render() {
        const { navigate } = this.props.navigation;
        const { width, height } = Dimensions.get('window')
        return (

            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('./image/LifeisVeryBeautiful.jpg')}>
                <View style={{ height: height - 85 }}>
                    <FlatList style={{ marginBottom: 50, marginTop: 50, paddingLeft: 28, paddingRight: 28 }} 
                    data={[{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }]}
                        ListHeaderComponent={this.renderListHeader}
                        renderItem={({ item }) => this.renderItem(item)}
                    >

                    </FlatList>
                </View>


                <View style={styles.buttomnavi}>
                    <View style={styles.buttomcenter}>
                        <Icon style={styles.Icon} name='camera' type='material' color='#f00'
                            containerStyle={{ alignSelf: 'center' }}
                            reverse size={28}
                            onPress={() => navigate('Camera', { name: 'user' })} />
                    </View>

                    <View style={styles.bottomleft}>
                        <Icon
                            name='local-florist'
                            type='material'
                            color='#fff'
                            onPress={() => navigate('Data', { name: 'user' })}

                        />
                        <View style={styles.bottomright}>
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

            </ImageBackground>

        );
    }
}
const AppStackNavigator = createStackNavigator({
    Home: { screen: Menu },
    Camera: { screen: Camera },
    Data: { screen: PlantData },
    Plant: { screen: PlantMenu },
    Blog: { screen: PlantBlog }
},//เป็นการประกาศสร้างตัว stacknavigator ไว้สำหรับเปลี่ยนหน้าของข้อมูลไปยังหน้าต่างๆแบบ stack ซ้อนกัน
    {
        orientation: 'portrait',
    })
const AppContainer = createAppContainer(AppStackNavigator);
export default AppContainer;
const styles = StyleSheet.create({
    buttomnavi: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f8f4f4'
    },
    buttomcenter: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#f8f4f4',
        width: 70,
        height: 70,
        borderRadius: 35,
        bottom: 25,
        zIndex: 10
    },
    bottomleft: {
        position: 'absolute',
        backgroundColor: '#9400D3',
        bottom: 0,
        zIndex: 1,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    bottomright: {
        flexDirection: 'row',
        justifyContent: 'center'
    }

})