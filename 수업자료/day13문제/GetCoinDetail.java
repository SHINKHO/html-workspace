package ch11_api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class GetCoinDetail {
	public static void main(String[] args) {
		String url = "https://api.upbit.com/v1/market/all";
		String url_detail = "https://api.upbit.com/v1/ticker?markets=";
		System.out.print("=========coin info===========");
		JSONArray arr1 = getRestAPI(url);
		for(Object obj : arr1) {
			JSONObject jsonObj = (JSONObject) obj;
			System.out.println(jsonObj.get("korean_name")+":"+jsonObj.get("market"));
		}
		Scanner scan = new Scanner(System.in);
		while(true) {
			System.out.println("조회 코인정보를 입력하세요");
			System.out.print(">>> ");
			// 키보드 입력 받기
			String name = scan.nextLine();
			JSONArray arr2 =getRestAPI(url_detail+name);
			
			for(Object obj : arr2) {
				JSONObject jsonObj = (JSONObject) obj;
				System.out.println("trade_price" + ":" + jsonObj.get("trade_price"));
			}
		}
	}
	public static JSONArray getRestAPI(String url) {
		
		JSONParser parser = new JSONParser();
		JSONArray arr = null;
		StringBuilder result = new StringBuilder();
		try {
			URL call_url = new URL(url);
			try {
				HttpURLConnection connection = (HttpURLConnection) call_url.openConnection();
				connection.setRequestMethod("GET");
				connection.setRequestProperty("Accept", "application/json");
				if(connection.getResponseCode() != 200) {
					throw new RuntimeException("failed:" + connection.getResponseCode());
				}
				BufferedReader br =
					new BufferedReader(new InputStreamReader(connection.getInputStream())); 
				
				String line;
				while((line = br.readLine()) != null) {
					result.append(line);
				}
				try {
					arr = (JSONArray) parser.parse(result.toString());
			
				} catch (ParseException e) {
					e.printStackTrace();
				}
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return arr;
		
	}
}
