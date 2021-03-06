import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';
import { getUsers, getUserById } from '../module/action';

function Home(props){

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [idUser, setIdUser] = useState(0);
    const [user, setUser] = useState([]);
    const [isShowUSer, setIsShowUSer] = useState(false);

    useEffect(() => {
        props.getUsers();
        if(props.users){
            setUser(props.users)
        }
    }, [isLoading]);

    useEffect(() => {
        if(isShowUSer){
            props.getUSerById(idUser)
            if(props.user){
                setUser(props.user)
            }
        }
    }, [isShowUSer]);

    const getUSerById = function(id) {
        setUsers([]);
        setIsShowUSer(true);
        setIdUser(id);
    };

    const goBack = function() {
        setUser([]);
        setIsShowUSer(false);
        setIsLoading(true);
    };

    return (
        isLoading ? 
        <View style={styles.wrapper}>
            <View style={styles.box}>
                <Text>Cargando...</Text>
            </View>
        </View>
        :
        isShowUSer ?
        <View style={styles.wrapper}>
            <View style={styles.box}>
                <Image style={styles.stretch} source={user.avatar} />
                <Text style={styles.space}>{user.first_name}</Text>
                <Text style={styles.space}>{user.last_name}</Text>
                <Text style={styles.space}>{user.email}</Text>
                <TouchableOpacity style={styles.button} onPress={() => { goBack() }}>
                    <Text>Regresar</Text>
                </TouchableOpacity>
            </View>
        </View>
        :
        <View>
            {
                users.map((user, index) => 
                    <View key={index}>
                        <View style={styles.container}>
                            <View style={styles.box_user}>
                                <Image style={styles.stretch} source={user.avatar} />
                                <Text style={styles.space_container}>{user.first_name}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => { getUSerById(user.id) }}>
                                    <Text style={styles.space}>Ver</Text>
                                </TouchableOpacity>
                            </View>        
                        </View>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282c34',
        justifyContent:'center',
        alignItems:'center',
        position:'flex',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        paddingTop: 10,
    },
    stretch: {
        width: 100,
        height: 150,
        resizeMode: 'stretch',
    },
    button: {
        width: "20%",
        height: "20%",
        borderRadius: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#33cccc",
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#282c34',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
    },
    box: {
        paddingVertical:25,
        paddingHorizontal:35,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(240,250,220,0.5)',
        borderRadius:6
    },
    box_user:{
        paddingVertical:15,
        paddingHorizontal:25,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(240,250,220,0.5)',
        borderRadius:6
    },
    space: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    space_container: {
        paddingLeft: 25,
        paddingRight: 25,
    },
});

 const mapStateToProps = (store) => ({
    users: store.users,
    user: store.user
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getUsers,
            getUserById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Home)