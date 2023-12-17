package com.issurance.Application.entities;

public enum PremiumType {
	TWELWE_MONTHS("12 Months"),
	 THREE_MONTHS("3 Months"),
	 SIX_MONTHS("6 Months");
	
	private final String displayName;

    PremiumType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
