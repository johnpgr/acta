// Fallback for using MaterialIcons on Android and web.

import { cn } from "@/lib/utils"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { SymbolWeight, SymbolViewProps } from "expo-symbols"
import { cssInterop } from "nativewind"
import { ComponentProps } from "react"
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native"

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>
type IconSymbolName = keyof typeof MAPPING

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.down": "expand-more",
  "chevron.up": "expand-less",
  "checkmark": "check",
  "xmark": "close",
} as IconMapping

function IconSymbolImpl({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName
  size?: number
  color?: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  )
}

cssInterop(IconSymbolImpl, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: "size",
      width: "size",
      color: "color",
    },
  },
})

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName
  size?: number
  color?: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return (
    <IconSymbolImpl
      name={name}
      size={size}
      color={color}
      style={style}
    />
  )
}

export type { IconSymbolName }
