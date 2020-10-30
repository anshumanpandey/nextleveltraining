import React, { useRef, useState } from 'react'
import { TouchableOpacity, Text, Dimensions, View } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu';

const maxHeight = (Dimensions.get("screen").height / 100) * 45

const NLDropdownMenu = ({ options, onSelect, disabled = false, placeholder = "Select",theme = { button: {}, textButton: {},menu: {}} }) => {
    const menuRef = useRef()
    const [ selectedValue, setselectedValue ] = useState();

    return (
        <>
            <Menu
                ref={(r) => menuRef.current = r}
                style={{ width: '85%', position: 'absolute', maxHeight: 300, ...theme.menu }}
                button={
                    <TouchableOpacity disabled={disabled} onPress={() => menuRef.current?.show()} style={[{ width: '100%',height: 50, justifyContent: 'center', ...theme.button }]}>
                        <Text numberOfLines={1} style={{ paddingLeft: 30, ...theme.textButton, color: selectedValue ? "black" : theme.textButton.color || 'gray', }}>
                            {selectedValue ? selectedValue : placeholder}
                        </Text>
                    </TouchableOpacity>
                }
            >
                {options.map(o => {
                    return <MenuItem style={{ maxWidth: 'auto', marginLeft: 'auto', marginRight: 'auto'}} onPress={() => {
                        setselectedValue(o.label)
                        onSelect(o.value)
                        menuRef.current?.hide()
                    }}>
                        <Text>{o.label}</Text>
                    </MenuItem>;
                })}
            </Menu>
        </>
    );
}

export default NLDropdownMenu;