package com.example.messagingstompwebsocket.controller;

import com.example.messagingstompwebsocket.components.GraphData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.HashMap;

@RestController
@Log4j2
public class GraphDataController {

	private SimpMessagingTemplate simpMessagingTemplate;
	private GraphData graphData;

	public GraphDataController(SimpMessagingTemplate simpMessagingTemplate, GraphData graphData) {

		this.graphData = graphData;
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	@Scheduled(fixedRate = 1000)
	public void sendPeriodicMessages() throws JsonProcessingException {

		String broadcast = String.format("server periodic message %s via the broker", LocalTime.now());
		System.out.println(broadcast);
		HashMap<String, Object> header = new HashMap<>();
		header.put("Content-Type", "application/json");
		try
		{
			Object data = new ObjectMapper().writeValueAsString(this.graphData.getHeadObject());
			
			simpMessagingTemplate.convertAndSend("/topic/graph_data", data, header);
			
		}
		catch (Exception e) {
			simpMessagingTemplate.convertAndSend("/topic/graph_data", "error", header);
		}
		
	}

}