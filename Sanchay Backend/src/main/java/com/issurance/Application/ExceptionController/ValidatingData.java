package com.issurance.Application.ExceptionController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;

import jakarta.validation.constraints.Pattern;

public class ValidatingData {

	
	private static final String NAME_REGEX = "^[A-Za-z ]{1,30}$";
	private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
	private static final String usernameRegex = "^[A-Za-z][A-Za-z0-9]*$";
	private static final String PINCODE_REGEX = "/^[0-9]{6}$/";
	private static final String MOBILE_NUMBER_REGEX = "^[0-9]{10}$";
	private static final String ADDRESS_REGEX = "^[A-Za-z0-9\\s]+$";
	private static final String BIRTHDATE_REGEX = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
	private static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!])(?!^\\d)(?!.*\\s).{8,}$";


	private static final String NUMBER_REGEX = "^[0-9]+$";
	private static final String DOCUMENT_DETAIL_REGEX = "^[A-Za-z,]*$";


    @Pattern(regexp = DOCUMENT_DETAIL_REGEX)
    public boolean validateDocumentDetail(String documentDetail) {
        return documentDetail != null && documentDetail.matches(DOCUMENT_DETAIL_REGEX);
    } 
	
	
    @Pattern(regexp = NAME_REGEX)
   	public boolean validateName(String name) {
        return name != null && name.matches(NAME_REGEX);
    }
    
    @Pattern(regexp = NUMBER_REGEX)
    public boolean validateNumber(String number) {
        return number != null && number.matches(NUMBER_REGEX);
    }
    
    @Pattern(regexp = EMAIL_REGEX)
    public boolean validateEmail(String email) {
        return email != null && email.matches(EMAIL_REGEX);
    }
    
    @Pattern(regexp = usernameRegex)
    public boolean validateUsername(String username) {
        return username != null && username.matches(usernameRegex);
    }
    
    @Pattern(regexp = PINCODE_REGEX)
    public boolean validatePincode(String pincode) {
        return pincode != null && pincode.matches(PINCODE_REGEX);
    }
    
    @Pattern(regexp = MOBILE_NUMBER_REGEX)
    public boolean validateMobileNumber(String mobileNumber) {
        return mobileNumber != null && mobileNumber.matches(MOBILE_NUMBER_REGEX);
    }
    
    @Pattern(regexp = ADDRESS_REGEX)
    public boolean validateAddress(String address) {
        return address != null && address.matches(ADDRESS_REGEX);
    }
    
    @Pattern(regexp = BIRTHDATE_REGEX)
    public boolean validateBirthdate(String birthdate) {
        if (birthdate == null) {
            return false;
        }
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);

        try {
           
            Date parsedDate = dateFormat.parse(birthdate);
            
           
            return dateFormat.format(parsedDate).equals(birthdate);
        } catch (ParseException e) {
            return false;
        }
    }
    
    @Pattern(regexp = PASSWORD_REGEX)
    public static boolean validatePassword(String password) {
        if (password == null) {
            return false;
        }

        return password!=null && password.matches(PASSWORD_REGEX);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	
}
