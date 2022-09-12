package com.pxb.backend.model;

import java.io.Serializable;
import java.util.List;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private List<String> grantList;
    private String username;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }
    public JwtResponse(String jwttoken, String username, List<String> grantList) {
        this.username = username;
        this.grantList = grantList;
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public List<String> getGrantList() {
        return grantList;
    }

    public String getUsername() {
        return username;
    }
}
