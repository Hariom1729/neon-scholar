import React from 'react';

export default function StreakCalendar({ streakDates = {} }) {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  // Get last month's overflow days
  const daysFromLastMonth = Array.from({ length: firstDayOfMonth }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), -i);
    return {
      day: date.getDate(),
      inMonth: false,
      date: date.toISOString().split('T')[0]
    };
  }).reverse();

  // Get this month's days
  const daysThisMonth = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
    return {
      day: i + 1,
      inMonth: true,
      date: date.toISOString().split('T')[0],
      isToday: i + 1 === today.getDate()
    };
  });

  // Combine all days
  const allDays = [...daysFromLastMonth, ...daysThisMonth];

  // Week day labels
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="streak-calendar">
      {/* Month and year header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '12px',
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--neon-2)'
      }}>
        {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </div>

      {/* Week days header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px'
      }}>
        {weekDays.map(day => (
          <div key={day} style={{
            fontSize: '11px',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)'
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px'
      }}>
        {allDays.map((day, idx) => (
          <div
            key={idx}
            style={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '500',
              background: day.isToday ?
                'linear-gradient(135deg, var(--neon-1), var(--neon-2))' :
                streakDates[day.date] ?
                  'rgba(155,89,255,0.15)' :
                  'rgba(255,255,255,0.03)',
              borderRadius: '6px',
              border: day.isToday ?
                '1px solid var(--neon-2)' :
                '1px solid rgba(255,255,255,0.06)',
              color: day.inMonth ?
                (day.isToday ? '#0f172a' : '#fff') :
                'rgba(255,255,255,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {day.day}
            {streakDates[day.date] && (
              <div style={{
                position: 'absolute',
                bottom: '2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'var(--neon-1)'
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}