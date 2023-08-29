'use client';
import React from 'react';

import styles from './page.module.css';
function AvailabilityEditor({ doctorSchedule, setDoctorSchedule }) {
	const handleStartTimeChange = (dayIndex, newStartTime) => {
		const newAvailability = [...doctorSchedule];
		newAvailability[dayIndex].startTime = newStartTime;
		setDoctorSchedule(newAvailability);
	};

	const handleEndTimeChange = (dayIndex, newEndTime) => {
		const newAvailability = [...doctorSchedule];
		newAvailability[dayIndex].endTime = newEndTime;
		setDoctorSchedule(newAvailability);
	};

	const renderTimeOptions = () => {
		const timeOptions = [];
		const interval = 30; // Intervalo en minutos

		for (let hour = 0; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += interval) {
				const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
				timeOptions.push(time);
			}
		}

		return timeOptions.map((time, index) => (
			<option key={index} value={time}>
				{time}
			</option>
		));
	};

	return (
		<div className={styles.scheduleEditor}>
			{doctorSchedule?.map((day, index) => (
				<div key={day.id} className={styles.day}>
					<h3>{day.name.charAt(0).toUpperCase() + day.name.slice(1)}</h3>
					<label>
						Start Time:
						<select
							value={day.startTime}
							onChange={event => handleStartTimeChange(index, event.target.value)}
						>
							{renderTimeOptions()}
						</select>
					</label>
					<label>
						End Time:
						<select
							value={day.endTime}
							onChange={event => handleEndTimeChange(index, event.target.value)}
						>
							{renderTimeOptions()}
						</select>
					</label>
				</div>
			))}
			<pre>{JSON.stringify(doctorSchedule, null, 2)}</pre>
		</div>
	);
}

export default AvailabilityEditor;
