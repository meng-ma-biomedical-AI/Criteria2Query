package edu.columbia.dbmi.ohdsims.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import edu.columbia.dbmi.ohdsims.pojo.Attribute;
import edu.columbia.dbmi.ohdsims.pojo.Document;
import edu.columbia.dbmi.ohdsims.pojo.LoginForm;
import edu.columbia.dbmi.ohdsims.pojo.Paragraph;
import edu.columbia.dbmi.ohdsims.pojo.Sentence;
import edu.columbia.dbmi.ohdsims.pojo.Term;

@Controller
@RequestMapping("/session")
public class SessionController {
	@RequestMapping("/get_current")
	@ResponseBody
	public Map<String, Object> getSession(HttpSession httpSession) {
		System.out.println("get session!!!");
		Document doc = (Document) httpSession.getAttribute("allcriteria");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("json", doc);
		return map;
	}
	
	@RequestMapping(value = "/set_current",method = RequestMethod.POST, consumes="application/json", produces = "application/json")
	@ResponseBody
	public Map<String, Object> setSession(HttpSession httpSession, @RequestBody Document doc) {
		System.out.println("set session!!!");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("json", doc);
		httpSession.setAttribute("allcriteria",doc);

		return map;
	}
}
