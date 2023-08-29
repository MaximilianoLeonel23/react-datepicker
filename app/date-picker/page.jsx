'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './page.module.css';
import doctorAvailability from './dayMockedData.js';
import { addMinutes, isWeekend, setHours, setMinutes } from 'date-fns';
import AvailabilityEditor from './AvailabilityEditor';
import { holidayDates } from './holidayDates';

function DoctorAvailability() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [doctorSchedule, setDoctorSchedule] = useState(doctorAvailability.days);

	const isWeekendDay = date => {
		return isWeekend(date); // Utiliza la función isWeekend para determinar si es fin de semana
	};

	const excludeWeekends = date => {
		return !isWeekendDay(date); // Retorna verdadero si no es fin de semana, es decir, no es sábado ni domingo
	};

	const renderFormattedDate = date => {
		const dateFormatter = new Intl.DateTimeFormat('es-ES', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short',
		});

		return dateFormatter.format(date);
	};

	const handleDoctorSchedule = day => {
		const daySchedule = doctorSchedule.find(daySchedule => daySchedule.dayOfWeek === day);

		console.log(daySchedule);
		if (daySchedule) {
			const startTimeParts = daySchedule.startTime.split(':');
			const endTimeParts = daySchedule.endTime.split(':');
			const startHour = parseInt(startTimeParts[0]);
			const startMinute = parseInt(startTimeParts[1]);
			const endHour = parseInt(endTimeParts[0]);
			const endMinute = parseInt(endTimeParts[1]);

			const availableTimes = [];

			for (
				let currentTime = setHours(setMinutes(selectedDate, startMinute), startHour);
				currentTime <= setHours(setMinutes(selectedDate, endMinute), endHour);
				currentTime = addMinutes(currentTime, 30)
			) {
				availableTimes.push(currentTime);
			}

			return availableTimes;
		}

		return [];
	};

	console.log(selectedDate.getTime());
	return (
		<main className={styles.container}>
			<section className={styles.consultSelector}>
				<h2>Establecer Disponibilidad del Doctor</h2>
				<DatePicker
					selected={selectedDate}
					onChange={date => {
						setSelectedDate(date);
						const day = date.getDay();
						handleDoctorSchedule(day);
					}}
					showTimeSelect
					minDate={new Date()}
					includeTimes={handleDoctorSchedule(selectedDate.getDay())}
					filterDate={excludeWeekends}
					excludeDates={holidayDates}
				/>
				<div>Fecha seleccionada: {renderFormattedDate(selectedDate)}</div>
				<div>Fecha en formato TIMESTAMP: {selectedDate.getTime()}</div>
			</section>
			<section>
				<AvailabilityEditor doctorSchedule={doctorSchedule} setDoctorSchedule={setDoctorSchedule} />
			</section>
		</main>
	);
}

export default DoctorAvailability;
