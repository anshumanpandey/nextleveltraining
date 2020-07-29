import React from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'
import { Image } from "react-native"
import { Text, View, Icon } from 'native-base'
import Images from '../../constants/image'
import Colors from '../../constants/color'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import ImageProgress from 'react-native-image-progress';

const TrainingLocationScreen = (props) => {
    const [profile] = useGlobalState('profile')

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            <Header
                customButton={() => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate("TrainingLocationEdit", { item: undefined })}>
                            <Text>Create</Text>
                        </TouchableOpacity>
                    );
                }}
                hideCreatePost={true}
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
            />
            {profile?.TrainingLocations.length == 0 && <Text style={{ textAlign: 'center', fontSize: 20, marginTop: '20%'}}>No training locations created</Text>}
            {profile?.TrainingLocations.length != 0 && profile?.TrainingLocations.map(t => {
                return (
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("TrainingLocationEdit", {item: t} )
                    }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: '5%', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.2)' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <ImageProgress
                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                        imageStyle={{ width: 50, height: 50, borderRadius: 25 }}
                                        source={t.ImageUrl ? {uri: t.ImageUrl}: Images.PlayerPlaceholder}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{t.LocationName}</Text>
                                    <Text style={{ fontSize: 12 }}>{t.LocationAddress}</Text>
                                </View>
                            </View>
                            <View>
                                <Icon
                                    type="EvilIcons"
                                    name="pencil"
                                    style={{ color: Colors.s_blue, fontSize: 28 }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

export default TrainingLocationScreen