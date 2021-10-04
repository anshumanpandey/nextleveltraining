import React, { useState } from 'react'
import { Text, View, Icon } from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import ImageProgress from 'react-native-image-progress';
import { useGlobalState } from '../../state/GlobalState'
import TrainingLocationFormModal from '../profile/coachProfile/TrainingLocationFormModal'
import Header from '../../components/header/Header'
import Images from '../../constants/image'
import Colors from '../../constants/color'

const TrainingLocationScreen = (props) => {
    const [profile] = useGlobalState('profile')
    const [showTrainingLocationModal, setShowTrainingLocationModal] = useState(false);

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            <Header
                title="Training Locations"
                customButton={() => (
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexGrow: 1,
                        }}>
                        <Icon
                            onPress={() => props.navigation.goBack()}
                            type="Feather"
                            name="arrow-left"
                            style={{
                                left: 15,
                                fontSize: 22,
                                color: '#2D7AF0',
                            }}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: '#0F2F80', width: 70, height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}

                            onPress={() =>
                                setShowTrainingLocationModal(true)
                            }>
                            <Text style={{ color: 'white' }}>Create</Text>
                        </TouchableOpacity>
                    </View>
                )}
                hideCreatePost
                toggleDrawer={props.navigation.toggleDrawer}
                navigate={props.navigation.navigate}
            />
            {profile?.TrainingLocations.length == 0 && <Text style={{ textAlign: 'center', fontSize: 20, marginTop: '20%' }}>No training locations created</Text>}
            {profile?.TrainingLocations.length != 0 && profile?.TrainingLocations.map(t => (
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("TrainingLocationEdit", { item: t })
                }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: '5%', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.2)' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <ImageProgress
                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                    imageStyle={{ width: 50, height: 50, borderRadius: 25 }}
                                    source={t.ImageUrl ? { uri: t.ImageUrl } : Images.PlayerPlaceholder}
                                />
                            </View>
                            <View style={{ width: '80%', marginLeft: 'auto' }}>
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
            ))}
            <TrainingLocationFormModal
                afterCreation={() => setShowTrainingLocationModal(false)}
                isVisible={showTrainingLocationModal}
                onCancel={() => setShowTrainingLocationModal(false)}
            />

        </ScrollView>
    );
}

export default TrainingLocationScreen