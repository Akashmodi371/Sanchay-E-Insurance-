package com.issurance.Application.Controller;

import java.lang.reflect.Field;

public class ReflectionUtils {
    public static void copyNonNullFields(Object source, Object target) {
        Field[] fields = source.getClass().getDeclaredFields();
        
        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(source);
                if (value != null) {
                    field.set(target, value);
                }
            } catch (IllegalAccessException e) {
                // Handle exception if needed
            }
        }
    }
}

