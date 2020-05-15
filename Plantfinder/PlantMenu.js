import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Alert, StatusBar, TouchableOpacity,
    ImageBackground, Image, ScrollView, FlatList, Dimensions, TextInput,
    ActivityIndicator, Animated
} from 'react-native'
import axios from 'axios';
import style from './style'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ListItem, SearchBar, Icon } from "react-native-elements";
import { Body, Header, List, ListItem as Item, ScrollableTab, Tab, Tabs, Title } from "native-base";

const uid = DeviceInfo.getUniqueId();   //ดึง id ของเครื่อง user มาใช้เป็น user id 
const NAVBAR_HEIGHT = 56;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COLOR = "#9400D3";


export default class PlantMenu extends Component {
    scroll = new Animated.Value(0);
    headerY;
    static navigationOptions = {
        headerShown: false,
        headerMode: 'none'
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            text: '',
            isLoading: true,
        };
        this.arrayholder = [];
        this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
    }
    componentDidMount() {
        this.makeRemoteRequest();

    }
    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false,
                    isLoading: false,
                },
                    function () {
                        this.arrayholder = res.results;
                        console.log(res.results)
                    }
                );
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };
    renderItem(item) {
        // console.log(this.state.data)
        const { navigate } = this.props.navigation;
        return (
            // <ListItem

            //     title={`${item.name.first} ${item.name.last}`}
            //     subtitle={item.email}
            //     leftAvatar={{ source: { uri: item.picture.thumbnail } }}
            //     containerStyle={{ borderBottomWidth: 0 }}
            // onPress={this.GetFlatListItem.bind(this, item.name)}
            // />

            <View>
                <TouchableOpacity>
                    <ListItem
                        title='ดอกทานตะวัน'
                        subtitle='Sunflower'
                        leftAvatar={{ source: require('./image/exflower/sunflower.jpg') }}
                        onPress={() => navigate('Data', { name: 'user' })}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <ListItem
                        title='ดอกไอริส'
                        subtitle='iris'
                        leftAvatar={{ source: require('./image/exflower/iris.jpg') }}
                        onPress={() => navigate('Data', { name: 'user' })}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <ListItem
                        title='ดอกป็อปปี้'
                        subtitle='poppy'
                        leftAvatar={{ source: require('./image/exflower/popy.jpg') }}
                        onPress={() => navigate('Data', { name: 'user' })}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                        title='ดอกทิวลิป'
                        subtitle='Tulip'
                        leftAvatar={{ source: require('./image/exflower/Tulip.jpg') }}
                        onPress={() => navigate('Data', { name: 'user' })}
                    />
                </TouchableOpacity>
             
                <TouchableOpacity>
                    <ListItem
                        title='ดอกโบตั๋น'
                        subtitle='peony'
                        leftAvatar={{ source: require('./image/exflower/peony.jpg') }}
                        onPress={() => navigate('Data', { name: 'user' })}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                        title='ดอกเดซี่'
                        subtitle='daisy'
                        leftAvatar={{ source: require('./image/exflower/daisy.jpg')}}
                        onPress={() => navigate('Data', { name: 'user' })}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem
                        title='ดอกพุดซ้อน'
                        subtitle='Gardenia'
                        leftAvatar={{ source: require('./image/exflower/Gardenia.jpg') }}
                        onPress={() => navigate('Data', { name: 'user' })}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                <ListItem
                    title='ดอกบานไม่รู้โรย'
                    subtitle='Globe amaranth'
                    leftAvatar={{ source: require('./image/exflower/Globeamaranth.jpg') }}
                    onPress={() => navigate('Data', { name: 'user' })}
                />
            </TouchableOpacity>
            </View>


        );
    }
    searchData(text) {
        const newData = this.arrayholder.filter(item => {
            const itemData = item.name ? item.name.first.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });

        this.setState({
            data: newData,
            text: text
        })
    }

    renderListHeader = () => {

        return (

            <SearchBar
                style={styles.textInput}
                onChangeText={(text) => this.searchData(text)}
                value={this.state.text}
                underlineColorAndroid='transparent'
                placeholder="Search Here"
                lightTheme round />
        );
    };
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    render() {
        const { navigate } = this.props.navigation;
        const { width, height } = Dimensions.get('window');
        const tabContent = (
            <FlatList
                contentContainerStyle={{ hight: height - 20, paddingBottom: 56 }}
                //data={this.state.data}
                data={id = '1'}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderListHeader}
                renderItem={({ item }) => this.renderItem(item)}

                keyExtractor={(item, name) => name.toString()}
                enableEmptySections={true}

            >

            </FlatList>);
        const tabY = Animated.add(this.scroll, this.headerY);
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View  >
                <View >
                    <View>
                        {Platform.OS === "ios" &&
                            <View style={{ backgroundColor: COLOR, height: 20, width: "100%", position: "absolute", zIndex: 2 }} />}
                        <Animated.View style={{
                            width: "100%",
                            position: "absolute",
                            transform: [{
                                translateY: this.headerY
                            }],
                            elevation: 0,
                            flex: 1,
                            zIndex: 1,
                            backgroundColor: COLOR
                        }}>
                            <Header style={{ backgroundColor: "transparent" }} hasTabs>
                                <Body>
                                    <Title>
                                        <Text style={{ color: "white" }}>PlantFinder</Text>
                                    </Title>
                                </Body>
                            </Header>
                        </Animated.View>
                        <Animated.ScrollView
                            scrollEventThrottle={1}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            style={{ zIndex: 0, height: "100%", elevation: -1 }}
                            contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
                                { useNativeDriver: true },
                            )}
                            overScrollMode="never">
                            <Tabs renderTabBar={(props) => <Animated.View
                                style={[{
                                    transform: [{ translateY: tabY }],
                                    zIndex: 1,
                                    width: "100%",
                                    backgroundColor: COLOR
                                }, Platform.OS === "ios" ? { paddingTop: 20 } : null]}>
                                <ScrollableTab {...props} underlineStyle={{ backgroundColor: "white" }} />
                            </Animated.View>
                            }>
                                <Tab heading="ความรัก" {...TAB_PROPS}>
                                    {tabContent}
                                </Tab>
                                <Tab heading="ความยินดี " {...TAB_PROPS}>
                                    {tabContent}
                                </Tab>
                                <Tab heading="ความเสียใจ" {...TAB_PROPS}>
                                    {tabContent}
                                </Tab>
                                <Tab heading="เยี่ยมคนป่วย " {...TAB_PROPS}>
                                    {tabContent}
                                </Tab>
                            </Tabs>
                        </Animated.ScrollView>
                    </View>

                </View>


            </View>

        );
    }
}
const TAB_PROPS = {
    tabStyle: {// hight:SCREEN_HIGHT / 10, 
        width: SCREEN_WIDTH / 4, backgroundColor: COLOR
    },
    activeTabStyle: { width: SCREEN_WIDTH / 4, backgroundColor: COLOR },
    textStyle: { color: "white" },
    activeTextStyle: { color: "white" },
    fontSize: 1
};
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
    },
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
        fontFamily: "Opun"
    },
    text: {
        fontSize: 17,
        paddingBottom: 15,
        fontFamily: "Opun"
    },
    justContain: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,

    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },

})