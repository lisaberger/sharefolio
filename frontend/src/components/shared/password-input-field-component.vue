<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { computed } from 'vue';

enum AddonPosition {
    Left = 'left',
    Right = 'right',
}

interface Props {
    addon?: boolean;
    addonPos?: AddonPosition;
    icon?: string;
    id: string;
    field: string;
    label: string;
    validators?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
    addon: true,
    addonPos: AddonPosition.Left,
    icon: 'person',
});

const modelValue = defineModel<string>();
const rules = {
    [props.field]: props.validators || {},
};

const $v = useVuelidate(
    rules,
    {
        [props.field]: modelValue,
    },
    {
        $lazy: true,
        $autoDirty: true,
    }
);
</script>
<template>
    <div class="mb-3 flex flex-col gap-2 text-sm">
        <label :for="props.id">{{ props.label }}</label>
        <prime-input-group>
            <prime-input-group-addon
                v-if="props.addon && props.addonPos === 'left'"
            >
                <slot name="icon-left">
                    <span class="material-icons">{{ props.icon }}</span>
                </slot>
            </prime-input-group-addon>
            <prime-input-text
                :id="props.id"
                v-model="modelValue"
                :aria-describedby="`${props.id}-help`"
                :invalid="$v[props.field].$error"
            />
        </prime-input-group>
        <prime-input-group-addon
            v-if="props.addon && props.addonPos === 'right'"
        >
            <slot name="icon-right">
                <span class="material-icons">{{ props.icon }}</span>
            </slot>
        </prime-input-group-addon>
        <template v-if="$v[props.field].$error">
            <small
                v-for="error in $v[props.field].$errors"
                :key="error.$uid"
                :id="`${props.id}-help`"
                class="text-red-500"
            >
                {{ error.$message }}
            </small>
        </template>
    </div>
</template>
